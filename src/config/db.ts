import { Pool } from "pg";

export const connectDB = (dbUrl: string) => {

  const pool: Pool = new Pool({ connectionString: dbUrl });
  

  pool.on('connect', () => { console.log('database connected'); })

  pool.on('error', (err: Error) => {console.log('Unexpected error occured', err)} )

  return pool;
};

// Call the function to test the database connection
