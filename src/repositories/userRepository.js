import client from "../config/database.js";

async function insert(email, password) {
  await client.user.create({
    data: {
      email,
      password,
    },
  });
}

async function getUserByEmail(email) {
  const user = await client.user.findFirst({
    where: {
      email,
    },
  });

  return user;
}

const userRepository = {
  insert,
  getUserByEmail,
};

export default userRepository;
