import express, { Express } from "express";
import { productsRouter } from "./controllers/products.controller";
import { authRouter, validateSession } from "./controllers/auth.controller";
import layouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import session from "express-session";

export default function (): Express {
    const app = express();
    app.use(session({
        secret: process.env.SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            secure: false, 
            httpOnly: true, 
            maxAge: 60000 
        }
    }));

    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.set("view engine", "ejs");
    app.set("views", "Shop.Admin/views");

    app.use(express.static(__dirname + "/public"));
    app.use(layouts);
    app.use((req, res, next) => {
        res.locals.currentPath = req.path;
        next();
    });

    app.use(validateSession);
    app.use("/auth", authRouter);
    app.use("/", productsRouter);

    return app;
}