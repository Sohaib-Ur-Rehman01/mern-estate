import User from '../models/user.model.js'
import bcryptjs, { hash } from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {

  console.log(req.body);
  const { username, email, password } = req.body
  const hashedPassword = bcryptjs.hashSync(password, 10)
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save()
    res.status(201).json("User created successfully!")

  } catch (error) {
    next(errorHandler(550, error.message))

  }

}
export const signin = async (req, res, next) => {
  const { email, password } = req.body
  console.log("req.body :", req.body);

  try {
    const validUser = await User.findOne({ email })
    if (!validUser) return next(errorHandler(404, "User not found!"))
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) {
      return next(errorHandler(404, "Wrong Credentials!"))
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    const { password: pass, ...rest } = validUser._doc
    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
    // res.status(200).json("User signed in successfully!")
  } catch (error) {
    console.log("error :", error);
    next(error)
  }

}
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      const { password, pass, ...rest } = user._doc;
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)

    } else {
      const generatePassword = Math.random().toString(36).slice(-8) + Math.random()
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10)
      const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8), email: req.body.email, password: hashedPassword, avatar: req.body.photo })
      await newUser.save()
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
      const password = { password: pass, ...rest } = newUser._doc;
      res.cookie('access_token', token, {
        httpOnly: true
      }).status(200).json(rest)

    }
  } catch (error) {
    next(error)
  }
}
export const singout = (req, res, next) => {
  try {
    res.clearCookie('access_token').status(200).json({ success: true, message: "User signed out successfully!" });

  } catch (error) {
    next(error)

  }
}