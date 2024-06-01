import { addUser, authenticateUser, getFoodEstablishments } from "../Controllers/controllers.js";

const setUpRoutes = (app) => {
    app.post("/addUser", addUser);
    app.post("/authenticate", authenticateUser);
    app.post("/getFoodEstablishments", getFoodEstablishments);
}

export default setUpRoutes;