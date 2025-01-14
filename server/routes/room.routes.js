const express = require("express");
const router = express.Router();

const Rooms = require("../models/Room.model");

//Crud
router.post("/room", async (req, res) => {
  try {
    const newRoom = await Rooms.create(req.body);

    return res.status(201).json(newRoom);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
});

//cRud ---> FIND ALL
router.get("/room", async (req, res) => {
  try {
    const rooms = await Rooms.find();

    return res.status(200).json(rooms);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

//cRud ---> FIND ONE
router.get("/room/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Rooms.findOne({ _id: id }).populate({
      path: "reviews",
      model: "Review",
    })
    

    if (room) {
      return res.status(200).json(room);
    } else {
      return res.status(404).json({ msg: "Room not found." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

//crUd ---> UPDATE ONE
router.put("room/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const foundRoom = await Rooms.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    if (foundRoom) {
      return res.status(200).json(foundRoom);
    } else {
      return res.status(404).json({ msg: "Room not found." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Room not found. " });
  }
});

//cruD ---> DELTE ONE
router.delete("room/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRoom = Rooms.deleteOne({ _id: id });

    if (deletedRoom) {
      return res.status(200).json(deletedRoom);
    } else {
      return res.status(404).json({ msg: "Room not found." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Room not found." });
  }
});

module.exports = router;

