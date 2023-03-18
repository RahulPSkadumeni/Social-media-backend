const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
//register//

router.post("/register", async (req, res) => {
  console.log(req.body);

  try {
    //generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      phoneNo: req.body.phoneNo,
    });

    //save new user
    const user = await newUser.save();

    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

//login; //

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    !user && res.status(404).send("user not found");
    const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);

    console.log(req.body.password, user.password);

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(validPassword);

    !validPassword && res.status(400).json("wrong password");
    res.status(200).json("login success");
  } catch (err) {
    console.log(err);
  }
  //   try {
  //     //generate hashed password
  //     const salt = await bcrypt.genSalt(10);
  //     const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //     //create new user

  //     //save new user
  //     const user = await newUser.save();

  //     console.log(user);
  //     res.status(200).json(user);
  //   } catch (err) {
  //     console.log(err);
  //   }
});

module.exports = router;
