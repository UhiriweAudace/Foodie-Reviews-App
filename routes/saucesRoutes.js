const Sauce = require('../models/Sauces');
const fs = require('fs');
const express = require('express');
const multerConfig = require('../middleware/multer-config');
const router = express.Router();

const isAuth = require('../middleware/isAuth');

/***
 * POST /api/sauces
 */

router.post('/', isAuth, multerConfig, async (req, res, next) => {

  try {

    let data = JSON.parse(req.body.sauce);
    const name = data.name;
    const manufacturer = data.manufacturer;
    const description = data.description;
    const mainPepper = data.mainPepper;
    const heat = data.heat;

    const url = "http://" + req.get('host') + "/images/" + req.file.filename;
    const sauce = new Sauce({
      name: name,
      manufacturer: manufacturer,
      description: description,
      mainPepper: mainPepper,
      heat: heat,
      userId: req.user.id,
      imageUrl: url
    });

    await sauce.save();

    res.status(200).send({
      message: "successfully sauce created..."
    });

  } catch (error) {
    console.log({
      message: error
    })
  }
  next();
});

router.get('/', isAuth, async (req, res, next) => {
  let sauces = await Sauce.find();
  res.send(sauces);
  next();
});


router.get('/:id', isAuth, async (req, res, next) => {
  const found = await Sauce.findById({
      _id: req.params.id
    })
    .populate('user', ['_id', 'email']);

  if (found) return res.status(200).send(found);

});


/**
 * Updates the sauce with the provided _id.If an
 image is uploaded, capture it and update
 the sauces imageUrl.If no file is provided, the
 sauce details are directly within the request body
     (req.body.name, req.body.heat etc).If a file is provided, the stringified
 sauce is in req.body.sauce.
 */

router.put('/:id', isAuth, multerConfig, async (req, res, next) => {


  if (req.file) {
    const fieldFound = await Sauce.findById({
      _id: req.params.id
    });
    if (fieldFound) {
      let filename = fieldFound.imageUrl.split("/images/")[1];
      fs.unlink('images/' + filename, async () => {
        let data = JSON.parse(req.body.sauce);
        const name = data.name;
        const manufacturer = data.manufacturer;
        const description = data.description;
        const mainPepper = data.mainPepper;
        const heat = data.heat;
        const url = "http://" + req.get('host') + "/images/" + req.file.filename;

        const sauce = await Sauce.findByIdAndUpdate(
          req.params.id, {
            name: name,
            manufacturer: manufacturer,
            description: description,
            mainPepper: mainPepper,
            heat: heat,
            userId: req.user.id,
            imageUrl: url
          }, {
            new: true
          })

        if (!sauce) return res.status(400).send({
          message: "sauce with given id isn't updated...."
        });

        await sauce.save();
      });
    }


    res.status(200).send({
      message: "updated..."
    })
  } else {
    const name = req.body.name;
    const manufacturer = req.body.manufacturer;
    const description = req.body.description;
    const mainPepper = req.body.mainPepper;
    const heat = req.body.heat;
    const sauce = await Sauce.findByIdAndUpdate(
      req.params.id, {
        name: name,
        manufacturer: manufacturer,
        description: description,
        mainPepper: mainPepper,
        heat: heat
      }, {
        new: true
      });

    if (!sauce) return res.status(404).send({
      message: "sauce with given id is not found...."
    });

    await sauce.save();
    res.status(200).send({
      message: "updated..."
    })
  }


});

router.delete('/:id', isAuth, async (req, res, next) => {

  const fieldFound = await Sauce.findOne({
    _id: req.params.id
  });
  if (fieldFound) {
    let filename = fieldFound.imageUrl.split("/images/")[1];
    fs.unlink('images/' + filename, async () => {
      await Sauce.deleteOne({
        _id: fieldFound._id
      });

    });
  }
  res.send({
    message: "successfully deleted..."
  });
  next();
});

//POST / api / sauces /: id / like
router.post('/:id/like', isAuth, async (req, res, next) => {
  const fieldFound = await Sauce.findById({
    _id: req.params.id
  });


  //this is for liking the sauce 
  if (req.body.like === 1) {
    if (fieldFound.usersLiked.filter(like =>
        like.toString() === req.user.email.toString()).length > 0) {

      res.send({
        message: "user already liked this sauce"
      });

    } else {
      // add the user to the usersLiked Array
      fieldFound.likes++;
      if (fieldFound.likes === 0) {
        fieldFound.likes = 0;
        res.send({
          likes: fieldFound.likes
        })
      }

      fieldFound.usersLiked.unshift(req.user.email.toString());

      if (fieldFound.usersDisLiked.filter(like => like.toString() === req.user.email.toString()).length > 0) {
        fieldFound.dislikes--;
        fieldFound.usersDisLiked.shift(req.user.email.toString());
      }
    }

    // saving to the database
    await fieldFound.save();
    res.send({
      message: "sauce liked..."
    })
  }

  //this is for disliking the sauce
  if (req.body.like === -1) {

    if (fieldFound.usersDisLiked.filter(like =>
        like.toString() === req.user.email.toString()).length > 0) {
      res.status(401).send({
        message: "Already you disliked this sauce.."
      });
    } else {
      // add the user to the usersLiked Array
      fieldFound.dislikes++;
      if (fieldFound.dislikes === 0) {
        fieldFound.dislikes = 0;
        res.send({
          dislikes: fieldFound.dislikes
        })
      }

      fieldFound.usersDisLiked.unshift(req.user.email.toString());

      if (fieldFound.usersLiked.filter(like => like.toString() === req.user.email.toString()).length > 0) {
        fieldFound.likes--;
        fieldFound.usersLiked.shift(req.user.email.toString());
      }
    }

    // saving to the database
    await fieldFound.save();
    res.send({
      message: "Sauce has been disliked..."
    })
  }

  next();
});

module.exports = router;