import crypto from "crypto";
import { config } from "../conf/config";

const ENCRYPTION_KEY =
  config.encryptionKey || "0123456789abcdef0123456789abcdef";
const IV = config.encryptionIV || "abcdef9876543210";

const algorithm = "aes-256-cbc";

if (Buffer.byteLength(ENCRYPTION_KEY) !== 32) {
  throw new Error("OTP_ENCRYPTION_KEY must be 32 bytes");
}
if (Buffer.byteLength(IV) !== 16) {
  throw new Error("OTP_ENCRYPTION_IV must be 16 bytes");
}

// URL-safe base64 encode
const toUrlSafeBase64 = (str: string): string =>
  str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

// Decode from URL-safe base64 to standard base64
const fromUrlSafeBase64 = (str: string): string =>
  str.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((str.length + 3) % 4);

// Encrypt UUID and return a URL-safe base64 string
export const encodeOtpId = (uuid: string): string => {
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(ENCRYPTION_KEY),
    Buffer.from(IV)
  );
  let encrypted = cipher.update(uuid, "utf8", "base64");
  encrypted += cipher.final("base64");
  return toUrlSafeBase64(encrypted);
};

// Decode from URL-safe base64 and decrypt
export const decodeOtpId = (encoded: string): string => {
  const base64 = fromUrlSafeBase64(encoded);
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(ENCRYPTION_KEY),
    Buffer.from(IV)
  );
  let decrypted = decipher.update(base64, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
