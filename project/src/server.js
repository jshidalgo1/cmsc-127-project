import cors from 'cors';
import setUpRoutes from "./Routes/routes.js";
import express from "express";
import { setUpDatabase } from "./Database/db.js";

const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

setUpDatabase();
setUpRoutes(app);

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});