const express = require('express');
const router = express.Router();
const albumShema = require('../models/album.m')
const authenticate = require('../middlewares.js/authenticate')

router.post('/addAlbum', authenticate, async function (req, res) {
    const artist = req.user;
    let Album = await albumShema.create({
        name: req.body.name,
        artist: artist._id,
        year: req.body.year,
        genre: req.body.genre,
        songs: req.body.songs,
        artistimg: req.body.artistimg,
        artistname:req.body.artistname,
        albumimg:req.body.albumimg
    })
    return res.status(200).send({
        Album
    })
})

router.patch('/editAlbum:id', authenticate, async function (req, res) {
    let Album = await albumShema.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    })
    return res.status(200).send({
        Album
    })
})
router.get("/allAllbum:name", async function (req, res) {
    let Albmus = await albumShema.find()
})
router.get("/allAllbum", async function (req, res) {
    const page = +req.query.page || 1;
    const size = +req.query.limit || 5;
    const year = +req.query.year || 1;
    const offset = (page - 1) * size;
    let Albmus = await albumShema.find().sort({
        year: year
    }).skip(offset).limit(size).lean().exec();
    const totalPages = Math.ceil(
        (await albumShema.find().countDocuments().lean().exec()) / size
    );
    if (Albmus.length == 0) return res.status(200).send({
        message: "artiest dnt have any students"
    });
    return res.send({
        Albmus,
        totalPages
    })
})

module.exports = router