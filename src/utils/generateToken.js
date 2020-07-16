import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'erniuniu123', { expiresIn: '7 days' })
}

export default generateToken
