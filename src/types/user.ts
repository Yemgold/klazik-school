



import { BaseEntity } from "./common";

export type UserRole =
  | "ADMIN"
  | "ORGANIZER"
  | "STUDENT";

export interface User extends BaseEntity {
  firstName: string;

  lastName: string;

  email: string;

  phone?: string;

  avatar?: string;

  role: UserRole;

  verified: boolean;

  active: boolean;
}