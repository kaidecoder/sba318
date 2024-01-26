const express = require("express")
const router = express.Router()
const Housing = require("../models/housing");

//about the app
router.get("/about", (req, res) => {
    res.render("about");
  });
  
  
  //create a new resource in the form
  router.get("/create", (req, res) => {
    res.render("createResource");
  });

//get all the housing
router.get("/housing", (req, res) => {
    Housing.find()
      .then((result) => {
        res.render("housing", { housing: result });
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  //add a new housing
  router.post("/housing", (req, res) => {
    const housing = new Housing(req.body);
  
    housing
      .save()
      .then((result) => {
        res.redirect("/housing");
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  //get one housing - send to showpage
  router.get("/housing/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    await Housing.findById(id)
      .then((result) => {
        console.log(result);
        res.render("showHousing", { housing: result });
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  //delete a housing item
  router.delete("/housing/:id", (req, res) => {
    const id = req.params.id 
    Housing.findByIdAndDelete(id)
    .then(result => {
      res.json({redirect: "/housing"})
    })
    .catch(error => {
      console.log(error)
    })
  })
  
  //update a housing item
  router.patch("/housing/:id", async (req, res) => {
    try {
      const id = req.params.id 
      const housing = await Housing.findByIdAndUpdate(id, req.body, {new: true})
      console.log(housing)
    
      res.json({housing})
    } catch (error) {
      
    }
  
  })

module.exports = router