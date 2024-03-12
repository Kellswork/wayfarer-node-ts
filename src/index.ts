import express, { Application, Request, Response} from 'express';
import dotenv from 'dotenv'
import { debug } from 'console';

dotenv.config();

const app:Application = express();
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to wayfarer APP API")
})
const server = app.listen(PORT, () => {
 console.log('Server started on port: ', PORT)
})

process.on('SIGTERM', () => {
  console.info('SIGTERM signal recived: Shuting down server')
  // perfomr clean up task here
  server.close(()=> {
    console.info('server is shutdown')
    process.exit(0)
  })
  
})
process.on('SIGINT', () => {
  debug('SIGINT signal received: Shuting down server');
   // perfomr clean up task here
  server.close(()=> {
    console.info('server is shutdown')
    process.exit(0)
  })
});