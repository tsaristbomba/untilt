type StateTypes = {
  users?: object;
  loading: boolean;
  error?: null | string;
  success?: null | string;
};
type ThisUserTypes = {
  name: string;
  id: string;
  password: string;
  role: string;
};
type UserTypes = {
  name: string;
  _id: string;
  password: string;
  role: string;
};
