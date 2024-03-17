// user model for database
export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string; 
}

// user model for creating an account request payload
export interface UserRequestBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

// user model for created account if neded