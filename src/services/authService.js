import userRepository from "../repositories/userRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function createUser(email, password) {
  const foundUser = await userRepository.getUserByEmail(email);
  if (foundUser) throw { status: 409, message: "email is already registered" };

  password = cryptPassword(password);
  await userRepository.insert(email, password);
}

async function loginUser(email, password) {
  const foundUser = await userRepository.getUserByEmail(email);
  if (!foundUser) throw { status: 401, message: "invalid user/password" };
  comparePassword(password, foundUser.password);
  const token = genToken(foundUser.id);
  const userInfo = { token, name: foundUser.name };
  return userInfo;
}

function cryptPassword(password) {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, SALT);
}

function comparePassword(password, cryptedPassword) {
  if (!bcrypt.compareSync(password, cryptedPassword))
    throw { status: 401, message: "invalid user/password" };
}

function genToken(id) {
  const data = { id };
  const config = { expiresIn: process.env.JWT_EXPIRES };
  const token = jwt.sign(data, process.env.JWT_SECRET, config);
  return token;
}

const authService = {
  createUser,
  loginUser,
};

export default authService;
