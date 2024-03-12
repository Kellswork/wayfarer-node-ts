import express, { Application, Request, Response} from 'express';
import dotenv from 'dotenv'
import { debug } from 'console';

export interface RootResponse {
  message: string;
}

dotenv.config();

const app:Application = express();
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response<RootResponse>) => {
  res.status(200).json({
    message : 'Welcome to wayfarer API'
  })
})

export const server = app.listen(PORT, () => {
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