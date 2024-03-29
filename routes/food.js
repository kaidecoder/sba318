const express = require("express");
const router = express.Router();
const Food = require("../models/food");

//about the app
router.get("/about", (req, res) => {
  res.render("about");
});

//create a new food in the form
router.get("/create", (req, res) => {
  res.render("createResource");
});

//get all food, or get food by zip
router.get("/food", async (req, res) => {
  try {
    // Retrieve foods based on the ZIP code (if provided)
    const zip = req.query.zip;
    const foods = zip ? await Food.find({ zip: zip }) : await Food.find();

    // Render the "index" page with the list of foods
    res.render("index", { foods: foods });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "document not available" });
  }
});


//add a new food
router.post("/food", (req, res) => {
  const food = new Food(req.body);

  food
    .save()
    .then((result) => {
      res.redirect("/food");
    })
    .catch((error) => {
      console.log(error);
    });
});

//get one food - send to showpage
router.get("/food/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await Food.findById(id)
    .then((result) => {
      console.log(result);
      res.render("showPage", { food: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

//delete a food item
router.delete("/food/:id", (req, res) => {
  const id = req.params.id;
  Food.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/food" });
    })
    .catch((error) => {
      console.log(error);
    });
});

//update a food item
router.patch("/food/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const food = await Food.findByIdAndUpdate(id, req.body, { new: true });
    console.log(food);

    res.json({ food });
  } catch (error) {}
});

module.exports = router;
