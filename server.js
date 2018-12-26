const Joi = require('joi');
const express = require('express');
const app = express();


app.use(express.json());

const movies = [{
        id: 1,
        genre: 'sci-fi'
    },
    {
        id: 2,
        genre: 'Action'
    },
    {
        id: 3,
        genre: 'Drama'
    },
    {
        id: 4,
        genre: 'Romance'
    }
]

/*****************************************
 *  api for getting all genres
 */
app.get('/api/genres', (req, res) => {
    res.send(movies)
})

/*******************************************
 *  api for creating a new genre with its id
 *
 */

app.post('/api/genres', (req, res) => {
    const {
        error
    } = validateGenres(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: movies.length + 1,
        genre: req.body.genre
    }
    movies.push(genre);
    res.send(genre)
})

/*******************************************
 *  api for updating one of the genres 
 * according to their id
 */
app.put('/api/genres/:id', (req, res) => {
    //Look up the course
    //If it doesn't exist , then return the 400 - Bad Request
    const genre = movies.find(g => g.id === parseInt(req.params.id));
    if (!genre) {
        res.status(400).send("this genre is not found!")
    }

    //Validate
    //If invalid, return 400 -Bad Request
    const {
        error
    } = validateGenres(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Otherwise
    genre.genre = req.body.genre;
    // return to client
    res.send(movies)
})

/*******************************************
 *  api for getting one of the genres 
 * according to their id
 */
app.get('/api/genres/:id', (req, res) => {
    const genre = movies.find(g => g.id === Number(req.params.id));
    if (!genre) {
        res.status(400).send("this genre is not found!")
    }
    res.send(genre)
})

/*******************************************
 *  api for deleting one of the genres 
 * according to their id
 */

app.delete('/api/genres/:id', (req, res) => {
    const genre = movies.find(g => g.id === Number(req.params.id));
    if (!genre) return res.status(400).send("this genre is not found!");

    const index = movies.indexOf(genre);
    movies.splice(index, 1);

    res.send(movies)

})











function validateGenres(genre) {
    const schema = {
        genre: Joi.string().min(4).required()
    };
    return Joi.validate(genre, schema);
}























const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listen the vidly app on port ${port}`));