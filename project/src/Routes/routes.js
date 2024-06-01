import { addUser, authenticateUser, getFoodEstablishments,getFoodItems } from "../Controllers/controllers.js";

const setUpRoutes = (app) => {
    app.post("/addUser", addUser);
    app.post("/authenticate", authenticateUser);
    app.post("/getFoodEstablishments", getFoodEstablishments);
    app.post("/getFoodItems", getFoodItems);
}

export default setUpRoutes;