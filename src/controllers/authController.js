import authService from "../services/authService.js";

async function signUp(req, res) {
  const { email, password } = req.body;
  await authService.createUser(email, password);
  return res.sendStatus(201);
}

async function signIn(req, res) {
  const { email, password } = req.body;
  const userInfo = await authService.loginUser(email, password);
  return res.send(userInfo);
}

async function health(req, res) {
  return res.send("OK");
}

const authController = {
  signIn,
  signUp,
  health,
};

export default authController;
