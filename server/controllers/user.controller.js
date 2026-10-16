import User from "../models/user.model.js";
import refillCredits, { getNextRefillAt } from "../utils/refillCredits.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user does not found" });
    }

    user = await refillCredits(user);

    const data = user.toObject();
    data.nextRefillAt = getNextRefillAt(user);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: `failed to get current user ${error}` });
  }
};