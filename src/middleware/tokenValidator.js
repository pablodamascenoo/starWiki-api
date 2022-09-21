import jwt from "jsonwebtoken";
import client from "../config/database.js";

export default async function verifyToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) throw { status: 401, message: "missing token" };

  const secretKey = process.env.JWT_SECRET;

  try {
    const data = jwt.verify(token, secretKey);

    const user = await client.user.findFirst({
      where: {
        id: data.id,
      },
    });

    if (!user) throw { status: 404, message: "user not found" };

    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    throw { status: 401, message: "invalid token" };
  }
}
