const { urlencoded } = require("express");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const connectMongo = require("connect-mongo");
const MongoStore = connectMongo.default || connectMongo;

require("dotenv").config();
const connectDB = require("./db/conn");
const views_path = path.join(__dirname, "../views");
const static_path = path.join(__dirname, "../static");
const languageMiddleware = require("./middleware/language");
const { requireAuth } = require("./middleware/auth");
const signupRouter = require("./routes/signup.route");
const loginRouter = require("./routes/login.route");
const app = express();
const port = process.env.PORT || 80;

connectDB();

app.use("/static", express.static(static_path));
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(languageMiddleware);

app.use(
    session({
        secret: process.env.SECRET || "taskify-secret-key",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/taskify"
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

app.set("view engine", "ejs");
app.set("views", views_path);

app.get("/", (req, res) => {
    res.status(200).render("index.ejs");
});

app.get("/signup", (req, res) => {
    res.status(200).render("signup.ejs");
});

app.use(signupRouter);
app.use(loginRouter);

app.get("/dashboard", requireAuth, (req, res) => {
    res.status(200).render("dashboard/dashboard.ejs");
});

app.get("/privacy-policy", (req, res) => {
    res.status(200).render("privacy-policy.ejs");
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`The application started successfully on port ${port}`);
    });
}
