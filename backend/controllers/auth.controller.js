import User from "../models/user.model.js"

export const signup = async (req, res) => {
	const {email, password, name} = req.body;
	const userExists = await User.findOne({ email });

	if (userExists) {
		return res.status(400).json({message: "User already exists"});
	}
	const user = await User.create({ name, email, password });

	// sent
	res.status(201).json({user, message: "User created successfully" });

	res.send("Sign up route called")
}

export const login = async (req, res) => {
	res.send("Log in route called")
}

export const logout = async (req, res) => {
	res.send("Log out route called")
}