import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    mongo_db_name: process.env.MONGO_DB_NAME,
    jwt_secret: process.env.JWT_SECRET
  },
  production: {
    uri: process.env.DATABASE_URL,
  },  
};
