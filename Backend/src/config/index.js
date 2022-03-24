if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  HOST: process.env.DEV_HOST,
  USER: process.env.DEV_USER,
  PASSWORD: process.env.DEV_PASSWORD,
  DB: process.env.DEV_DB,
  SALT_VALUE: process.env.SALT_VALUE,
  MAIL_API_KEY: process.env.MAIL_API_KEY,
  WEBSITE_LINK: process.env.WEBSITE_LINK,
};
