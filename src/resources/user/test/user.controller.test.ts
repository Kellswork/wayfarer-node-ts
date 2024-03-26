import UserRepository from "../user.repository";
import { UserController } from "../user.controller";
import { v4 as uuidv4 } from "uuid";
const httpMocks = require("node-mocks-http");
import { Pool } from "pg";
import { mockCreateUserDbResult } from "../../../models/Mocks/mockRepository";
import dotenv from 'dotenv';
dotenv.config();
// Mock the Pool class
jest.mock("pg");
jest.mock("uuid");

const mockRequestBody = {
  firstname: "kells",
  lastname: "ogbonna",
  email: "kell-test-50@gmil.com",
  password: "1234",
};


afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

it("should let a user create an account successfully", async () => {
  (uuidv4 as jest.Mock).mockReturnValue("d1b81d47-a409-4d4a-85f5-2b7a856221af");

  // create moc http request and response
  const response = httpMocks.createResponse();
  const request = httpMocks.createRequest();

  // mock request.body
  request.body = mockRequestBody;

  const db = new Pool();
  const userRepository = new UserRepository(db);

  const mockCreateUser = jest.spyOn(userRepository, "createUser");
  const mockEmailExists = jest.spyOn(userRepository, "emailExists");

  // result should be ho we are retiurning it from the API
  // in this case, should be in the form of what createUser returns
  const mockCreateUserResponse = jest.fn(() => {
    return Promise.resolve(mockCreateUserDbResult);
  });

  const mockEmailExistsResponse = jest.fn(() => {
    return Promise.resolve(false);
  });

  // mocking method implementation
  mockEmailExists.mockImplementation(mockEmailExistsResponse);
  mockCreateUser.mockImplementation(mockCreateUserResponse);

  const userController = new UserController(userRepository);

  await userController.userSignup(request, response);


  // write test cases
  expect(mockEmailExists).toHaveBeenCalledTimes(1);
  expect(mockCreateUser).toHaveBeenCalledTimes(1);
  expect(mockCreateUser).toHaveReturned(); // did not thrw an error
  expect(response.statusCode).toBe(201)
  expect(response._headers).toHaveProperty('authorization')
  
});


