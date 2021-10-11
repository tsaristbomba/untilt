type AuthStateTypes = {
  loggedIn?: boolean;
  admin?: boolean;
  token?: string | null;
  error?: string | null;
  loading?: boolean;
  user?: string | null;
  name?: string;
  reducer?: any;
  actions?: any;
};
type AuthTypes = {
  name: string;
  details: string;
  steps: string;
  priority: number;
  assigned: string;
  version: string;
  date?: string;
  _id?: string;
  status: string;
};

type LogPayload = {
  data: {
    token: string;
    user: string;
  };
};

type LoadPayload = {
  data: {
    name: string;
  };
};
type FormTypes = {
  name: string;
  password: string;
};
