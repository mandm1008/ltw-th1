import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { engine } from 'express-handlebars';
import connectDB from "./config/db.connect.js";
import { enableRouter } from "./router.js";

const __dirname = path.resolve();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// public folder
app.use(express.static(path.join(__dirname, 'src', 'public')));

// connect MongoDB
connectDB();

// enable handlebars engine
app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: false }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'src', 'views'));

// enable router
enableRouter(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
