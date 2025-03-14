export interface User {
  username: string;
  email: string;
  password: string;
}

export type UserCreate = User;

export interface UserUpdate {
  user_id: number;
  username: string;
  email: string;
  password: string;
}

export interface UserResponse extends User {
  user_id: number;
  created_at: string;
}
