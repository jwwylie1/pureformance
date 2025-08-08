import User from "../models/user.model.js"

export const signup = async (req, res) => {
	const {email, password, name} = req.body;
	const userExists = await User.findOne({ email });

	try {
		if (userExists) {
			return res.status(400).json({message: "User already exists"});
		}
		const user = await User.create({ name, email, password });

		// sent
		res.status(201).json({user, message: "User created successfully" });
	} catch (error) {
		res.send(500).json({ message: error.message });
	}

}

export const login = async (req, res) => {
	res.send("Log in route called")
}

export const logout = async (req, res) => {
	res.send("Log out route called")
}