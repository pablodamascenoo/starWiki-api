export default function errorHandler(error, req, res, next) {
  console.log(error);
  if (error.status) return res.status(error.status).send(error.message);

  return res.sendStatus(500);
}
