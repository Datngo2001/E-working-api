import { config } from "dotenv";
import firebaseAccount from "./ServiceAccountKey.json";

config();

export const {
  NODE_ENV,
  DATABASE_URL = "",
  PORT = 3001,
  CLIENT_URL = "",
  SECRET_KEY = "",
} = process.env;

firebaseAccount.private_key = process.env.FIREBASE_PRIVATE_KEY.replace(
  /\\n/g,
  "\n"
);
firebaseAccount.private_key_id = process.env.FIREBASE_PRIVATE_KEY_ID;

export const FirebaseAccount = firebaseAccount;
