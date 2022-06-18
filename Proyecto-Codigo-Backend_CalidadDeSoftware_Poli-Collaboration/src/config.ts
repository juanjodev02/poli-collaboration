import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE,
      host: process.env.HOST,
      databasePort: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.PASSWORD,
    },
    port: process.env.PORT,
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  };
});
