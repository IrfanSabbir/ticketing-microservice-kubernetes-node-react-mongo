import express, { Express, Request, Response } from "express";
import "express-async-errors"
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const PORT = 3000;
const app: Express = express();
app.use(express.json());


app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.get("/api/users/test", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Test api call for auth success"
  })
});


app.all('*', async (req, res) => {
  console.log("not found here")
  throw new NotFoundError();
});


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`⚡️[auth server]: is running at ${PORT}`)
});
