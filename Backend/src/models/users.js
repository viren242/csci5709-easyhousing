module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    fullname: {
      type: Sequelize.STRING,
      required: true,
    },
    email: {
      type: Sequelize.STRING,
      required: true,
    },
    password: {
      type: Sequelize.STRING,
      required: true,
    },
    role: {
      type: Sequelize.STRING,
      default: "app_user",
      required: true,
    },
  });
  return Users;
};
