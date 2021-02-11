import crypto from "crypto";

export async function hash(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(32);

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ":" + derivedKey.toString("hex"));
    });
  });
}

export async function verify(
  password: string,
  hashedPassword: string
): Promise<string | boolean> {
  return new Promise((resolve, reject) => {
    const [salt, key] = hashedPassword.split(":");

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key == derivedKey.toString("hex"));
    });
  });
}
