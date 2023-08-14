import express, { Express, Request, Response } from "express";

const PORT = 3000;
const app: Express = express();
app.use(express.json());

app.get("/api/users/currentuser", (req: Request, res: Response) => {
  res.send("Hi there!");
});

app.get("/api/users", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Test api call for auth success"
  })
});

app.listen(PORT, () => {
  console.log(`⚡️[auth server]: is running at ${PORT}`)
});
