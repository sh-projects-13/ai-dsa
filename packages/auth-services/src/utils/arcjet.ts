import arcjet, { validateEmail } from "@arcjet/node";
import { config } from "../conf/config";

const aj = arcjet({
  key: config.arcjetKey,
  rules: [
    validateEmail({
      mode: "LIVE",
      block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
    }),
  ],
});

export { aj };
