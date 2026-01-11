export type UserCreate = {
  email: string;
  password: string;
};

export type Task = {
  id: string;
  description: string;
  is_complete: boolean;
  created_at: string;
  updated_at: string;
};
