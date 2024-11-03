import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const app = express();

// Set up Global configuration access
dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server is listening at port : ${PORT}`);
});

// main code here

// generate JWT
app.post("/user/generateToken", (req, res) => {
  let jwtSecurityKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userID: 32,
  };

  const token = jwt.sign(data, jwtSecurityKey);
  res.send(token);
});

// verification of JWT
app.get("/user/validateToken", (req, res) => {
  // token are passed in header of request due to security reasons
  const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  const jwtSecurityKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);
    const verified = jwt.verify(token, jwtSecurityKey);
    if (verified) {
      res.send("successfully verified");
    } else {
      // access denied
      return res.status(401).send(`access denied : ${error}`);
    }
  } catch (error) {
    return res.status(401).send(error);
  }
});
