const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/login", async (req, res) => {
    try {
        const { LoginEmail, LoginPassword } = req.body;

        if (!LoginEmail || !LoginPassword) {
            return res.status(400).render("signup.ejs", {
                error: "Email and password are required"
            });
        }

        const user = await User.findOne({ email: LoginEmail });

        if (!user) {
            return res.status(401).render("signup.ejs", {
                error: "Invalid email or password"
            });
        }

        const isMatch = await user.comparePassword(LoginPassword);

        if (!isMatch) {
            return res.status(401).render("signup.ejs", {
                error: "Invalid email or password"
            });
        }

        req.session.userId = user._id;
        req.session.username = user.username;

        res.redirect("/dashboard");
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).render("signup.ejs", {
            error: "An error occurred during login"
        });
    }
});

module.exports = router;
