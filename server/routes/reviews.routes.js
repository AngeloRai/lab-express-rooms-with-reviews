const express = require("express");
const router = express.Router();

const Reviews = require("../models/Reviews.model");
const Rooms = require("../models/Room.model");

router.post("/review", async (req, res) => {
  try {
    const createdReview = await Reviews.create(req.body);

        await Rooms.findOneAndUpdate(
          { _id: req.body._id },
          { $push: { reviews: body.roomId } },
          { new: true }
        );

    return res.status(201).json(createdReview);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
});

router.get("/room/:id/review", async (req, res) => {
  try {
    const reviewsList = await Room.findOne({ _id: req.params.id }).populate(
      "reviews"
    );

    return res.status(200).json(reviewsList.reviews);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});



router.put("/review/:id", async (req, res) => {
  try {
    // O findOneAndUpdate() vai buscar um documento que atenda à consulta do primeiro parâmetro, e, caso encontre, atualizar com o conteúdo do segundo parâmetro. Ao final da atualização, retornará o objeto atualizado
    const updatedReview = await Review.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    console.log(updatedReview);
    // Se o findOne() retornar null, ou seja, não encontrar o review no banco, retornamos um 404 dizendo que não encontramos o review
    if (!updatedReview) {
      return res.status(404).json({ msg: "Review not found" });
    }

    return res.status(200).json(updatedReview);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

//cruD ---> DELTE ONE
router.delete("/room/review", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReview = Rooms.deleteOne({ _id: id });

    if (deletedReview) return res.status(200).json(deletedReview);
    return res.status(404).json({ msg: "Review not found." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Review not found." });
  }
});

module.exports = router;
