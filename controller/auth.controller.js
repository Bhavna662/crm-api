import userModel from "../model/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || 'secret123'

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    const user = await userModel.create({ fullname, email, password: hash })
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) return res.status(404).json({ message: "User not found" })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: "Invalid password" })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
