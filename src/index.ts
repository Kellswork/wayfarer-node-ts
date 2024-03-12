import express, { Express, Request, Response} from 'express';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to wayfarer APP API")
})
app.listen(PORT, () => {
 console.log('Server started on port: ', PORT)
})

