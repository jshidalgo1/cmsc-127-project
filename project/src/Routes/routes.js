import { addUser, authenticateUser } from "../Controllers/controllers.js";

const setUpRoutes = (app) => {
    app.post("/addUser", addUser);
    app.post("/authenticate", authenticateUser)
}

export default setUpRoutes;