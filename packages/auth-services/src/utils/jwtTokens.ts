import jwt from "jsonwebtoken";
import { updateRefreshandAccessTokenService } from "../services/auth.service";
import { config } from "../conf/config";

// User interface
interface iUser {
  id: string;
  name: string;
  email: string;
  username: string;
}

type StringValue = `${number}d`;

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
    config.accessTokenSecret,
    { expiresIn: config.accessTokenExpiry as StringValue }
  );
};

// refresh token
const generateRefreshToken = (id: string) => {
  return jwt.sign(
    {
      id: id,
    },
    config.refreshTokenSecret,
    { expiresIn: config.refreshTokenExpiry as StringValue }
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
