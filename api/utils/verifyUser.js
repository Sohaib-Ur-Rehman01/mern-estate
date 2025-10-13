import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js';
export const verifyToken = (req, res, next) => {
  const token =
    req.cookies?.access_token ||
    req.headers.authorization?.split(" ")[1];
  if (!token) return next(errorHandler(401, "unauthorized"))
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {

      return console.log('token failed to fetch checkkingg', err);
    }
    // next(errorHandler(403, "Forbidden"))
    req.user = user
    next()
  })
}