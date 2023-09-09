import express, { Express, Request, Response } from "express";
import "express-async-errors"
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
// import { errorHandler } from '@irftickets/common';
import { NotFoundError, errorHandler } from '@irftickets/common';


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

export { app }