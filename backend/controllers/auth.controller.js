import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
    // Store the refresh token in Redis
    await redis.set(`refreshToken:${userId}`, refreshToken, 
        'EX', 60 * 60 * 24 * 7); // Set expiration time to 7 days
};

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie('accessToken', accessToken, {
        httpOnly: true, // prevents XXS attacks
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict", // CSRF protection
        maxAge: 15 * 60 * 1000 // 15 minutes
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict", // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
};

export const signup = async (req, res) => {
	const {email, password, name} = req.body;
	const userExists = await User.findOne({ email });

	try {
		if (userExists) {
			return res.status(400).json({message: "User already exists"});
		}
		const user = await User.create({ name, email, password });

        // authenticate
        const { accessToken, refreshToken } = generateTokens(user._id);
        await storeRefreshToken(user._id, refreshToken);

        setCookies(res, accessToken, refreshToken);

		// sent
		res.status(201).json({user:{
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }, message: "User created successfully" });
	} catch (error) {
        console.log("Signup error:", error.message);
		res.send(500).json({ message: error.message });
	}

}

export const login = async (req, res) => {
	try {
        const { email, password } = req.body;
        const user = await User.findOne({ email});

        if (user && await user.comparePassword(password)) {
            // authenticate
            const { accessToken, refreshToken } = generateTokens(user._id);
            await storeRefreshToken(user._id, refreshToken);

            setCookies(res, accessToken, refreshToken);

            // sent
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.log("Login error:", error.message);
        return res.status(500).json({ message: "Login failed", error: error.message });
    }
}

export const logout = async (req, res) => {
	try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET).userId;
            await redis.del(`refreshToken:${decoded}`); // Remove the refresh token from Redis
        }

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Logout error:", error.message);
        return res.status(500).json({ message: "No refresh token found", error: error.message });
    }
}

// Refreshes the access token using the refresh token
export const refreshToken = async (req, res) => {
    try {
        const refreshTokenValue = req.cookies.refreshToken;
        if (!refreshTokenValue) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        const decoded = jwt.verify(refreshTokenValue, process.env.REFRESH_TOKEN_SECRET);
        const userId = decoded.userId;

        // Check if the refresh token exists in Redis
        const storedRefreshToken = await redis.get(`refreshToken:${userId}`);
        if (storedRefreshToken !== refreshTokenValue) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        // Generate new tokens
        const { accessToken, newRefreshToken } = generateTokens(userId);
        await storeRefreshToken(userId, newRefreshToken);

        setCookies(res, accessToken, newRefreshToken);

        res.json({ accessToken });
    } catch (error) {
        console.log("Refresh token error:", error.message);
        return res.status(500).json({ message: "Failed to refresh token", error: error.message });
    }
}

/* export const getProfile = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user ID is set in req.user by authentication middleware
        const user = await User.findById(userId).select("-password"); // Exclude password from response

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        console.log("Get profile error:", error.message);
        return res.status(500).json({ message: "Failed to get profile", error: error.message });
    }
} */