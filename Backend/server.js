const express = require("express");
const cors = require("cors");
const userRoute = require("../Backend/src/routes/userRoute");
const db = require("../Backend/src/models");
const passport = require("passport");

var corsOptions = {
  origin: "http://localhost:8080",
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db.sequelize.sync();
app.use(passport.initialize());

require("./src/middleware/passport")(passport);
//Routes
const serviceRouter = require("../Backend/src/routes/serviceRoute");
app.use("/services", serviceRouter);

app.use("/api/users", userRoute);

// app.use((req, res, next) => {
//   res.status(404).send({
//     status: 404,
//     error: "Please Enter Correct Route, Current Route Not found",
//   });
// });

db.sequelize.sync().then(() => {
  const listener = app.listen(process.env.PORT || 8080, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
});
