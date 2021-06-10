import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
  return res.status(200).send({
    message: "Hello world",
  });
});

try {
  app.listen(port, (): void => console.log(`Server running on port:${port}.`));
} catch (e) {
  console.error(`Error occured ${e.message}`);
}
