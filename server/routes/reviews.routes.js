const express = require("express");
const router = express.Router();

const Reviews = require("../models/Reviews.model");
const Rooms = require("../models/Room.model");

router.post("/review", async (req, res) => {
  try {
    const createdReview = await Reviews.create(req.body);

        const updatedRoom = await Rooms.findOneAndUpdate(
          { _id: req.body._id },
          { $push: { reviews: createdReview._id } },
          { new: true }
        );

    return res.status(201).json(createdReview);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
});

// cRud
// router.get("/room/review", async (req, res) => {
//   try {
//     const reviews = await Room.findOne({ _id: req.params.id }).populate({
//       path: "reviews",
//       model: "Review",
//     });

//     return res.status(200).json(reviewsList.reviews);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ msg: err });
//   }
// });

// //cruD ---> DELTE ONE
// router.delete("/room/review", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedReview = Rooms.deleteOne({ _id: id });

//     if (deletedReview) return res.status(200).json(deletedReview);
//     return res.status(404).json({ msg: "Review not found." });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ msg: "Review not found." });
//   }
// });

module.exports = router;
