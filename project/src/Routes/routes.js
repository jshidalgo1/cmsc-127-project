import {
    addUser,
    authenticateUser,
    getFoodEstablishments,
    getFoodItems,
    getFoodReviews,
    getFoodEstablishmentReviews,
    addEstablishment,
    deleteEstablishment,
    deleteFoodItem,
    updateEstablishment,
    updateFoodItem,
    getEstablishment,
    searchEstablishmentByName,
    searchFoodItemByName,
    saveEstablishmentReview,
    getFoodEstablishmentName,
    deleteEstablishmentReviews,
    getFoodItemsByEstablishmentId,
    getAllFoodItemsOrderedByEstablishmentName,
    getAllFoodItemsOrderedByEstablishmentNameAndFoodType,
    getAllFoodItemsOrderedByEstablishmentNameAndPrice,
    addFoodItemFromEstablishment,
    getAllFoodEstablishmentReviewsWithinMonth,
    getAllFoodItemReviewsWithinMonth,
    getSpecificFoodEstablishmentReview,
    updateEstablishmentReview,
    saveFoodItemReview,
    updateFoodItemReview,
    deleteFoodItemReview,
    getFoodItemName,
    getSpecificFoodItemReview
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
    app.delete('/deleteFoodItem', deleteFoodItem);
    app.put('/updateEstablishment', updateEstablishment);
    app.put('/updateFoodItem', updateFoodItem);
    app.get('/getEstablishment/:id', getEstablishment);
    app.get("/searchEstablishments", searchEstablishmentByName);
    app.get("/searchFoodItemByName", searchFoodItemByName);
    app.get('/getFoodItemsByEstablishmentId/:establishmentId', getFoodItemsByEstablishmentId);
    app.post('/saveEstablishmentReview', saveEstablishmentReview);
    app.get('/getFoodEstablishmentName/:id', getFoodEstablishmentName);
    app.delete('/deleteEstablishmentReviews', deleteEstablishmentReviews);
    app.post('/getAllFoodItemsOrderedByEstablishmentName', getAllFoodItemsOrderedByEstablishmentName);
    app.post('/getAllFoodItemsOrderedByEstablishmentNameAndFoodType', getAllFoodItemsOrderedByEstablishmentNameAndFoodType);
    app.post('/getAllFoodItemsOrderedByEstablishmentNameAndPrice', getAllFoodItemsOrderedByEstablishmentNameAndPrice);
    app.get('/getFoodEstablishmentReview/:id/:username', getSpecificFoodEstablishmentReview);
    app.put('/updateEstablishmentReview/:id', updateEstablishmentReview);
    app.post('/addFoodItemFromEstablishment', addFoodItemFromEstablishment);
    app.get('/getAllFoodEstablishmentReviewsWithinMonth', getAllFoodEstablishmentReviewsWithinMonth);
    app.get('/getAllFoodItemReviewsWithinMonth', getAllFoodItemReviewsWithinMonth);
    app.post('/saveFoodItemReview', saveFoodItemReview);
    app.put('/updateFoodItemReview/:id', updateFoodItemReview);
    app.delete('/deleteFoodItemReview', deleteFoodItemReview);
    app.get('/getFoodItemName/:id', getFoodItemName);
    app.get('/getFoodItemReview/:id/:username', getSpecificFoodItemReview);
}

export default setUpRoutes;

