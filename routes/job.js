const express = require("express")
const router = express.Router()
const Job = require("../models/job");

//about the app
router.get("/about", (req, res) => {
    res.render("about");
  });
  
  
  //create a new resource in the form
  router.get("/create", (req, res) => {
    res.render("createResource");
  });

//get all the food
router.get("/job", (req, res) => {
    Job.find()
      .then((result) => {
        res.render("jobs", { jobs: result });
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  //add a new food
  router.post("/job", (req, res) => {
    const job = new Job(req.body);
  
    job
      .save()
      .then((result) => {
        res.redirect("/job");
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  //get one food - send to showpage
  router.get("/job/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    await Job.findById(id)
      .then((result) => {
        console.log(result);
        res.render("showJobs", { job: result });
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  //delete a food item
  router.delete("/job/:id", (req, res) => {
    const id = req.params.id 
    Job.findByIdAndDelete(id)
    .then(result => {
      res.json({redirect: "/job"})
    })
    .catch(error => {
      console.log(error)
    })
  })
  
  //update a food item
  router.patch("/job/:id", async (req, res) => {
    try {
      const id = req.params.id 
      const job = await Job.findByIdAndUpdate(id, req.body, {new: true})
      console.log(job)
    
      res.json({job})
    } catch (error) {
      
    }
  
  })

module.exports = router