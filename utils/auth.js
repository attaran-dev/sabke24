import { hash, compare } from "bcrypt";

export async function hashPassword(password) {
  const hashPass = await hash(password, 10);
  return hashPass;
}

export async function verifyPassword(password, hashPass) {
  const isValid = await compare(password, hashPass);
  return isValid;
}
