const express = require("express")
const router = express.Router()
const Food = require("../models/food");

//about the app
router.get("/about", (req, res) => {
    res.render("about");
  });
  
  
  //create a new food in the form
  router.get("/create", (req, res) => {
    res.render("createResource");
  });

//get all the food
router.get("/food", (req, res) => {
    Food.find()
      .then((result) => {
        res.render("index", { foods: result });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //query food with zip=02116
router.get("/food", async (req, res) => {
  const zip = req.query.zip
  Food.findOne({zip})
  .then(doc => {
      res.status(200).json(doc)
  })
  .catch(error => {
      res.status(500).json({error: "document not available"})
  })
})
  
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
    const id = req.params.id 
    Food.findByIdAndDelete(id)
    .then(result => {
      res.json({redirect: "/food"})
    })
    .catch(error => {
      console.log(error)
    })
  })
  
  //update a food item
  router.patch("/food/:id", async (req, res) => {
    try {
      const id = req.params.id 
      const food = await Food.findByIdAndUpdate(id, req.body, {new: true})
      console.log(food)
    
      res.json({food})
    } catch (error) {
      
    }
  
  })

module.exports = router