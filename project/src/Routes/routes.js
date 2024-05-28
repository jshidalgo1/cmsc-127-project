import { addUser } from "../Controllers/controllers.js";

const setUpRoutes = (app) => {
    app.post("/addUser", addUser);
}

export default setUpRoutes;