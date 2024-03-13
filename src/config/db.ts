import { Pool, QueryConfig } from "pg";

export const connectDB = (dbUrl: string) => {

  const pool: Pool = new Pool({ connectionString: dbUrl });
  

  pool.on('connect', () => { console.log('database connected'); })

  pool.on('error', (err: Error) => {console.log('Unexpected error occured', err)} )

  const db = {
    query: (text: string, params?: QueryConfig[]) => pool.query(text, params),
  };

  return {pool, db};
};

// Call the function to test the database connection
