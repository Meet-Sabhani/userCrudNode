import User from "../model/userModel.js";
import _ from "lodash";

export const create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const { email } = newUser;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const savedData = await newUser.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (_.isEmpty(users)) {
      return res.status(200).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id: ", id);

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ errorMessage: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id: ", id);

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const update = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(update);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id: ", id);

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id, req.body, { new: true });

    res.status(200).json({ message: "User deleted Sucsefully" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ errorMessage: error.message });
  }
};
