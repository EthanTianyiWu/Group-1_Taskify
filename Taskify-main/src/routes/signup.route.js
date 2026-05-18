const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/signup", async (req, res) => {
    try {
        const { SignUpUsername, SignUpEmail, SignUpPassword } = req.body;

        if (!SignUpUsername || !SignUpEmail || !SignUpPassword) {
            return res.status(400).render("signup.ejs", {
                error: "All fields are required"
            });
        }

        const existingUser = await User.findOne({
            $or: [{ email: SignUpEmail }, { username: SignUpUsername }]
        });

        if (existingUser) {
            return res.status(400).render("signup.ejs", {
                error: "Username or email already exists"
            });
        }

        const user = new User({
            username: SignUpUsername,
            email: SignUpEmail,
            password: SignUpPassword
        });

        await user.save();

        req.session.userId = user._id;
        req.session.username = user.username;

        res.redirect("/dashboard");
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).render("signup.ejs", {
            error: "An error occurred during signup"
        });
    }
});

module.exports = router;
