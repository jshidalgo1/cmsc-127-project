import {
    addUser,
    authenticateUser,
    getFoodEstablishments,
    getFoodItems,
    getFoodReviews,
    getFoodEstablishmentReviews,
    addEstablishment,
    deleteEstablishment,
    updateEstablishment,
    getEstablishment,
    searchEstablishmentByName,
    saveEstablishmentReview
} from '../Controllers/controllers.js';

const setUpRoutes = (app) => {
    app.post("/addUser", addUser);
    app.post("/authenticate", authenticateUser);
    app.post("/getFoodEstablishments", getFoodEstablishments);
    app.post("/getFoodItems", getFoodItems);
    app.get('/getFoodReviews', getFoodReviews);
    app.get('/getFoodEstablishmentReviews', getFoodEstablishmentReviews);
    app.post('/addEstablishment', addEstablishment);
    app.delete('/deleteEstablishment', deleteEstablishment);
    app.put('/updateEstablishment', updateEstablishment);
    app.get('/getEstablishment/:id', getEstablishment);
    app.get("/searchEstablishments", searchEstablishmentByName);
    app.post('/saveEstablishmentReview', saveEstablishmentReview);

}

export default setUpRoutes;

