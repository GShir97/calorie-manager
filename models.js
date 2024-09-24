const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { required: true }, 
  first_name: { required: true },
  last_name: { required: true }, 
  birthday: {}
});

const calorieSchema = new mongoose.Schema({
  user_id: { required: true }, 
  year: { required: true, min: 1900, max: 2024 },
  month: { required: true, min: 1, max: 12 },
  day: { required: true, min: 1, max: 31 },
  description: { required: true }, 
  category: { 
      required: true,
      enum: ['breakfast', 'lunch', 'dinner', 'other'] 
  },
  amount: { required: true, min: 0 }
});


  // create Mongoose models for User and Calorie
  const User = mongoose.model('User', userSchema);
  const Calorie = mongoose.model('Calorie', calorieSchema);

  module.exports = { User, Calorie };
