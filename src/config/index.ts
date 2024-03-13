import dotenv from "dotenv";

dotenv.config();

class Configuration {
  private static instance: Configuration;

  public dbUrl: string | undefined;

  public NODE_ENV: string;

  public PORT: string;

  public HOST: string;

  public baseUrl: string;

  private constructor() {
    this.HOST = process.env.HOST ? process.env.HOST : "localhost";
    this.PORT = process.env.PORT ?? "3200";
    this.NODE_ENV = process.env.NODE_ENV ?? "development";
    this.dbUrl =
    this.NODE_ENV == "development"
      ? process.env.DB_URL
      : process.env.DATABASE_URL;
  this.baseUrl = "http://" + this.HOST + this.PORT;

  }

  public static getInstance(): Configuration {
    Configuration.instance = new Configuration();

    return Configuration.instance;
  }

}
const config = Configuration.getInstance();

export default config;
