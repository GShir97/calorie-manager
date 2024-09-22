const mongoose = require('mongoose');

// define the schema for the User collection
const userSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true }, 
    birthday: { type: Date }
  });
  
  // define the schema for the Calorie collection
  const calorieSchema = new mongoose.Schema({
    user_id: { type: Number, required: true }, 
    year: { type: Number, required: true, min: 1900, max: 2024 },
    month: { type: Number, required: true, min: 1, max: 12 },
    day: { type: Number, required: true, min: 1, max: 31 },
    description: { type: String, required: true }, 
    category: { 
        type: String, 
        required: true, 
        enum: ['breakfast', 'lunch', 'dinner', 'other'] 
    },
    amount: { type: Number, required: true, min: 0 }
  });

  // create Mongoose models for User and Calorie
  const User = mongoose.model('User', userSchema);
  const Calorie = mongoose.model('Calorie', calorieSchema);

  module.exports = { User, Calorie };
