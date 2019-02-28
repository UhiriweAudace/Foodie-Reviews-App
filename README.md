# Foodie Reviews App

* [Hot Takes App - on Heroku](https://hot-cakes.herokuapp.com/login)

` Expected response for each endpoints`

`GET /api/sauces `
- Array of sauces Returns array of all sauces in the database
```
{
    "_id": {
        "$oid": "5c77ec8b23bfe20058e4c3ee"
    },
    "likes": 0,
    "dislikes": 0,
    "usersLiked": [],
    "usersDisLiked": [],
    "name": "Recipe Sauce",
    "manufacturer": "Food Lovers Kigali",
    "description": "A sweet and slightly tangy option for chicken and potatoes. This is a favorite in our house.",
    "mainPepper": "1 1/2 pounds sweet potatoes, peeled and cut into 1-inch pieces1 pound chicken tenders2 teaspoons steak seasoning (such as Montreal Steak Seasoning®) 2 tablespoons vegetable oil  1/2 cup maple syrup  1/2 cup sliced green onions",
    "heat": 6,
    "userId": {
        "$oid": "5c77e30228d6c80058a01882"
    },
    "imageUrl": "http://hot-cakes.herokuapp.com/images/2019-02-28T14:13:31.074ZrecipeOne.jpg",
    "__v": 0
}
```

`GET  /api/sauces/:id `
- Single sauce Returns the sauce with the provided _id

`POST /api/sauces`
* {sauce: String,image: File} 
* {message: String}
Captures and saves image, parses stringified sauce and saves it 
to the database, setting its imageUrl correctly.Initialises
sauces likes and dislikes to 0, and usersLiked and usersDisliked to empty arrays.

`PUT /api/sauces/:id `

-  EITHER Sauce as JSON
    OR  {
            sauce: String,
            image: File
        } 

        {
            message: String
        }
- Updates the sauce with the provided _id.If an image is uploaded, capture it and 
    update the sauces imageUrl.If no file is provided, the sauce details are directly
    within the request body (req.body.name,req.body.heat etc).
    If a file is provided, the stringified sauce is in req.body.sauce.


`DELETE /api/sauces/:id `
* Deletes the sauce with the provided _id.

-   {
        message: String
    }

`POST /api/sauces/:id/like `
-   {
        userId: String,
        like: Number
    } 
-   {
        message: String
    }
* Sets "like" status for the userId provided.
* If like = 1, the user likes the sauce.
* If like = 0, the user is cancelling their like or dislike.
* If like = -1, the user dislikes the sauce.
* The user 's ID must be added to or removed from theappropriate array, 
    keeping track of their preferences and preventing them from liking or
     disliking the same sauce multiple times.
* Total number of likes and dislikes to be updated with each like.

## Authors

* **Audace Uhiriwe** - *Foodie Reviews App project* - [Hot takes App](https://github.com/UhiriweAudace/Foodie-Reviews-App)