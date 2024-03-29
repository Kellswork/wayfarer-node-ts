// user model for database
export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  is_admin: boolean;
  created_at?: string;
  updated_at?: string; 
}

// user model for creating an account request payload
export interface UserRequestBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

// user model for created account if neded
export interface CreatedUser {
  id: string;
  is_admin: boolean;
  created_at: number;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginUser {
  id: string;
  password?: string;
  is_admin: boolean;
  created_at: string;
}

