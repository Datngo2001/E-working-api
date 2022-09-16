import { SECRET_KEY } from "../config";
import jwt from "jsonwebtoken";

export function createToken(data) {
    return jwt.sign(data, SECRET_KEY, { algorithm: "HS256", expiresIn: "7d" });
}

export function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
}