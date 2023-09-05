import mongoose from "mongoose"

import { app } from './app';

const PORT = 3000;

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