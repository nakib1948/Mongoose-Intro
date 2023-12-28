import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV:process.env.NODE_ENV,
  port: process.env.PORT,
  databse_url: process.env.DATABASE_URL,
  default_password: process.env.DEFAULT_PASS ,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  bcrypt_salt_rounds: process.env.bcrypt_salt_rounds
};
