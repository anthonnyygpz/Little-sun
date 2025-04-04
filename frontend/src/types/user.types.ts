export type User = {
  sub: string;
  exp: number;
};

export type UserCreate = {
  email: string;
  username: string;
  password: string;
};
