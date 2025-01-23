export const config = {
  PORT: process.env.PORT || 3001,
  DATABASE_URL: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};
