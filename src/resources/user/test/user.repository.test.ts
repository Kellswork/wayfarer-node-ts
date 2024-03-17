//load dotenv file
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "../../../config/db";
import * as models from "../../../models/users";
import * as userRepo from "../user.repository";
import { hashPassword } from "../../../helpers/baseHelpers";

dotenv.config();

//unit test for createUser
describe("createUser", () => {
  beforeAll(async () => {
    // clear the user table
    async function clearUserTable() {
      const query = "DELETE FROM users RETURNING *";
      const result = await db.query(query);
    }
    clearUserTable();

    // close the db connection
  });
  afterAll(async ()=> {
    await db.end();
  })

  //get the test database url
  const tesDbUrl = process.env.TEST_DB_URL ?? "";
  // connect to the db store
  const db = connectDB(tesDbUrl);
  // create sample user object

  const sampleUser: models.User = {
    id: uuidv4(),
    firstname: "Kelechi",
    lastname: "Ogbonna",
    password: hashPassword("1234"),
    email: "ken-test-7@gmail.com",
    isAdmin: false,
    createdAt: Date.now(),
  };


  // next assert that the values returned form the email or id check, corresponds with the time returned
  it("should add a user to the database", async () => {
    // call createUser and pass in parameters
    await userRepo.createUser(db, sampleUser);
    // check that it didnt retiurn an error in another test
    // write a get by email or id function that returns the user object just created

    const response = (await userRepo.getUserByID(db, sampleUser.id))
      .rows[0];
    console.log("hekki", response);

    expect(sampleUser.id).toBe(response.id);
    expect(sampleUser.firstname).toBe(response.first_name);
    expect(sampleUser.lastname).toBe(response.last_name);
    expect(sampleUser.password).toBe(response.password);
    expect(sampleUser.email).toBe(response.email);
    expect(sampleUser.isAdmin).toBe(response.is_admin);
    // expect(sampleUser.createdAt).toBe(response.isAdmin);
  });
});

// use this for updating the test db DB_URL=test_db_url npm run migrate up
