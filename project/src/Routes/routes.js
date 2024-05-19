import { addUser } from "../Controllers/controllers.js";

const setUpRoutes = (app) => {
    app.post("/signup", addUser);
}

export default setUpRoutes;