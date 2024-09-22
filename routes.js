const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User, Calorie } = require('./models');


/*CALORIES*/

// route to add a new calorie log
router.post('/addcalories/', (req, res) => {
    const { user_id, year, month, day, description, category, amount } = req.body;
  
    // check if all required fields are provided
    if (!user_id || !year || !month || !day || !description || !category || !amount) {
      return res.status(400).json({ error: 'Missing required data' });
    }
  
    const id = new mongoose.Types.ObjectId();
    const newCalorie = new Calorie({
      id,
      user_id,
      year,
      month,
      day,
      description,
      category,
      amount
    });
  
    // save the new calorie entry to the db
    newCalorie.save()
      .then(calorie => {
        res.status(201).json(calorie);
      })
      .catch(err => {
        res.status(500).json({ error: 'Failed to add calorie item' });
      });
  });
  
// route to generate a report of calories
router.get('/report/', (req, res) => {
    const { user_id, year, month } = req.query;
  
    // check if all required query parameters are provided
    if (!user_id || !year || !month) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
  
    Calorie.find({ user_id, year, month })
      .then(calories => {
        const reportData = {
          breakfast: [],
          lunch: [],
          dinner: [],
          other: []
        };
  
        // organize calories into categories (breakfast, lunch, dinner, other)
        calories.forEach(calorie => {
          reportData[calorie.category].push({
            day: calorie.day,
            description: calorie.description,
            amount: calorie.amount
          });
        });
  
        res.json(reportData);
      })
      .catch(err => {
        res.status(500).json({ error: 'Failed to generate report' });
      });
});


/* USERS */

// route to get a specific user by ID
    router.get('/users/:id', (req, res) => {
    const userId = req.params.id;

// search for a user by their ID in the db
    User.findOne({ id: userId })
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
      })
      .catch(err => {
        res.status(500).json({ error: 'Failed to fetch user details' });
      });
  });
 
  
/* DEVELOPERS INFO */

// route to get information about the developers
  router.get('/about/', (req, res) => {
    const developers = [
      { firstname: "Sharon", lastname: "George", id: 322211368, email: "sharong0602@gmail.com" },
      { firstname: "Shir", lastname: "Goldstein", id: 318493384, email: "goldshir97@gmail.com" }
    ]; 
  
    res.json(developers);
  });

  router.get('/', (req, res) => {
    res.send('Welcome to the Calorie Management API!');
  });

  module.exports = router;
