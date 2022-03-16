const express = require("express");
const cors = require("cors");
const userRoute = require("../Backend/src/routes/userRoute");
const db = require("../Backend/src/models");

var corsOptions = {
  origin: "http://localhost:8080",
};

const app = express();
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
db.sequelize.sync();
app.use("/api/users", userRoute);

// app.use((req, res, next) => {
//   res.status(404).send({
//     status: 404,
//     error: "Please Enter Correct Route, Current Route Not found",
//   });
// });
const listener = app.listen(process.env.PORT || 8080, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
