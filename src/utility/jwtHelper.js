import jwt from "jsonwebtoken";

const SECRET_KEY = "Task31-JWT-Token";

export function generateToken(user) {
  return jwt.sign(user, SECRET_KEY, { expiresIn: "1d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    console.log(err);
    
    return null;
  }
}
