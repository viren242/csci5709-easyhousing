module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
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
      default: "house_seeker",
      enum: ["house_seeker", "house_owner", "super_admin"],
      required: true,
    },
  });
  return User;
};
