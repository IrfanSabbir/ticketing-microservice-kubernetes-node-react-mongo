import express, { Express, Request, Response } from "express";
import "express-async-errors"
import mongoose from "mongoose"
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const PORT = 3000;
const app: Express = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

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
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {

    if(!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined');
    }
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');

    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(PORT, () => {
    console.log(`⚡️[auth server]: is running at ${PORT}`)
  });
};

start();