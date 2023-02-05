import * as argon2 from "argon2";

export async function hash(plainPassword: string) {
  return await argon2.hash(plainPassword)
}

export function verify(plainPassword: string, hash: string) {
  return argon2.verify(hash, plainPassword)
}
