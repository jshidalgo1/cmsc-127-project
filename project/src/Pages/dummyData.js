export const USER = [
    {
        "Username": "john_doe",
        "First_name": "John",
        "Middle_name": "Edward",
        "Last_name": "Doe",
        "Password": "password123",
        "Email": "john@example.com",
        "Age": 30,
        "Birthday": "1994-06-15",
        "No_of_reviews": 5
    },
    {
        "Username": "jane_smith",
        "First_name": "Jane",
        "Middle_name": "Marie",
        "Last_name": "Smith",
        "Password": "janespassword",
        "Email": "jane@example.com",
        "Age": 28,
        "Birthday": "1996-09-20",
        "No_of_reviews": 8
    }
];

export const FOOD_ESTABLISHMENT = [
    {
        "Establishment_id": 1,
        "Name": "Tasty Bites",
        "Description": "A cozy restaurant serving delicious meals.",
        "Address": "123 Main Street, Cityville",
        "Type": "Restaurant"
    },
    {
        "Establishment_id": 2,
        "Name": "Pizza Palace",
        "Description": "Home of the best pizzas in town!",
        "Address": "456 Elm Street, Townsville",
        "Type": "Fast Food"
    }
];

export const USER_REVIEWS_FOOD_ESTABLISHMENT = [
    {
        "Username": "john_doe",
        "Establishment_id": 1,
        "review": "Great food and atmosphere!",
        "Review_date_time": "2024-05-28T18:30:00",
        "Rating": 4.5
    },
    {
        "Username": "jane_smith",
        "Establishment_id": 2,
        "review": "Excellent service and tasty pizzas!",
        "Review_date_time": "2024-05-29T12:45:00",
        "Rating": 5
    }
];

export const FOOD_ESTABLISHMENT_links = [
    {
        "Establishment_id": 1,
        "links": "https://www.tastybites.com"
    },
    {
        "Establishment_id": 1,
        "links": "https://www.tastybites.org"
    },
    {
        "Establishment_id": 2,
        "links": "https://www.pizzapalace.com"
    }
];

export const FOOD_ESTABLISHMENT_CONTACT_NO = [
    {
        "Establishment_id": 1,
        "Contact_no": "+1234567890"
    },
    {
        "Establishment_id": 1,
        "Contact_no": "+0987654321"
    },
    {
        "Establishment_id": 2,
        "Contact_no": "+1987654321"
    }
];

export const FOOD_ITEM = [
    {
        "Item_id": 1,
        "Name": "Spaghetti Carbonara",
        "Description": "Creamy pasta with bacon and cheese.",
        "Price": 12.99,
        "Food_type": "Pasta",
        "Establishment_id": 1
    },
    {
        "Item_id": 2,
        "Name": "Pepperoni Pizza",
        "Description": "Classic pizza with pepperoni toppings.",
        "Price": 9.99,
        "Food_type": "Pizza",
        "Establishment_id": 2
    },
    {
        "Item_id": 3,
        "Name": "Pepperoni Pizza",
        "Description": "Classic pizza with pepperoni toppings.",
        "Price": 9.99,
        "Food_type": "Pizza",
        "Establishment_id": 1
    }
];

export const USER_REVIEWS_FOOD_ITEM = [
    {
        "Username": "john_doe",
        "Item_id": 1,
        "review": "Delicious pasta!",
        "Review_date_time": "2024-05-28T19:00:00",
        "Rating": 4
    },
    {
        "Username": "jane_smith",
        "Item_id": 2,
        "review": "Best pizza ever!",
        "Review_date_time": "2024-05-29T13:00:00",
        "Rating": 5
    },
    {
        "Username": "jane_smith",
        "Item_id": 1,
        "review": "Best pizza ever!",
        "Review_date_time": "2024-05-29T13:00:00",
        "Rating": 5
    }
];
