import jwt from "jsonwebtoken";
import { updateRefreshandAccessTokenService } from "../services/auth.service";

// User interface
interface iUser {
  id: string;
  name: string;
  email: string;
  username: string;
}

// Generate JWT tokens

// access token
const generateAccessToken = (user: iUser) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRY) }
  );
};

// refresh token
const generateRefreshToken = (id: string) => {
  return jwt.sign(
    {
      id: id,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRY) }
  );
};

// Generate access and refresh tokens
export const generateAccessAndRefereshTokens = async (user: iUser) => {
  try {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user.id);

    await updateRefreshandAccessTokenService(user.id, refreshToken);

    return { accessToken, refreshToken };
  } catch (error: any) {
    console.log(error.message);
    return { accessToken: "", refreshToken: "" };
  }
};
