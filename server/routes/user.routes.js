const router = require("express").Router();
const bcrypt = require("bcryptjs");

const UserModel = require("../models/User.model");
const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

const salt_rounds = 10;

// Crud CREATE 

router.post("/signup", async (req, res) => {
  try {
    
    const { password } = req.body;
    
    if (
      !password ||
      !password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
      )
    ) {
      
      return res.status(400).json({
        msg:
          "Password is required and must have at least 8 characters, uppercase and lowercase letters, numbers and special characters.",
      });
    }

    const salt = await bcrypt.genSalt(salt_rounds);
   
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const result = await UserModel.create({
      ...req.body,
      passwordHash: hashedPassword,
    });
    
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
   
    const user = await UserModel.findOne({ email });

    console.log(user);
    
    if (!user) {
      return res
        .status(400)
        .json({ msg: "This email is not yet registered in our website;" });
    }

    if (await bcrypt.compare(password, user.passwordHash)) {
      
      const token = generateToken(user);

      return res.status(200).json({
        user: { name: user.name, email: user.email, _id: user._id },
        token,
      });
    } else {
      
      return res.status(401).json({ msg: "Wrong password or email" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

// cRud READ 

router.get("/profile", isAuthenticated, attachCurrentUser, (req, res) => {
  console.log(req.headers);

  try {
    
    const loggedInUser = req.currentUser;

    if (loggedInUser) {
      
      return res.status(200).json(loggedInUser);
    } else {
      return res.status(404).json({ msg: "User not found." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

// crUd UPDATE

router.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    console.log(result);

    
    if (!result) {
      return res.status(404).json({ msg: "User not found." });
    }

    
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

// cruD DELETE

router.delete("/user/:id", async (req, res) => {
  try {
    
    const { id } = req.params;

   
    const result = await UserModel.deleteOne({ _id: id });

    console.log(result);
   
    if (result.n === 0) {
      return res.status(404).json({ msg: "User not found." });
    }

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

module.exports = router;
