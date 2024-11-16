export type UsersType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  zip: string;
  city: string;
  phone: string;
};

export type SessionType = {
  expiresAt: Date;
  userId: string;
};

export type RegisterType = {
  message: string;
};

export type SessionContextType = {
  user: UsersType | null;
  loading: boolean;
  setUser: (user: UsersType | null) => void;
};

export type SessionPayload = {
  sessionId: string;
  expiresAt: Date;
  userId: string;
};
