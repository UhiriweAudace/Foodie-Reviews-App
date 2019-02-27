<<<<<<< HEAD
# Foodie Reviews App

## Hot Takes

## GET / api / sauces 
- Array of sauces Returns array of all sauces in the database

## GET / api / sauces /: id 
- Single sauce Returns the sauce with the provided _id

## POST / api / sauces
* {sauce: String,image: File} 
* {message: String}
Captures and saves image, parses stringified sauce and saves it 
to the database, setting its imageUrl correctly.Initialises
sauces likes and dislikes to 0, and usersLiked and usersDisliked to empty arrays.

## PUT / api / sauces /: id 

-  EITHER Sauce as JSON
OR {
    sauce: String,
    image: File
} 
{
    message: String
}
Updates the sauce with the provided _id.If an
image is uploaded, capture it and update
the sauces imageUrl.If no file is provided, the
sauce details are directly within the request body
    (req.body.name,req.body.heat etc).If a file is provided, the stringified
     sauce is in req.body.sauce.


## DELETE / api / sauces /: id 
-   {
        message: String
    }
* Deletes the sauce with the provided _id.

## POST / api / sauces /: id / like 
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
=======
# Foodie-Reviews-App
>>>>>>> 3e1d19a5f2844ea95a03e94ad7b16bb6f6a13e8d
