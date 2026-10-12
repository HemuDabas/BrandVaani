import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

const JWT_SECRET =
  process.env.JWT_SECRET || "brandvaani_secret_key_2026_super_secure";

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  password: string,
  hashedPassword?: string,
): Promise<boolean> {
  if (!hashedPassword) return false;
  return bcrypt.compare(password, hashedPassword);
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export async function getAuthUser(): Promise<TokenPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("brandvaani_token")?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch (error) {
    return null;
  }
}
