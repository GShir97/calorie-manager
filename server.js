const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb+srv://goldshir97:goldshir97@cluster0.3x8dz.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});


const userSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  birthday: String 
});

const calorieSchema = new mongoose.Schema({
  user_id: Number,
  year: Number,
  month: Number,
  day: Number,
  description: String,
  category: String,
  amount: Number
});

const User = mongoose.model('User', userSchema);
const Calorie = mongoose.model('Calorie', calorieSchema);

app.post('/addcalories/', (req, res) => {
  const { user_id, year, month, day, description, category, amount } = req.body;

  if (!user_id || !year || !month || !day || !description || !category || !amount) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  const newCalorie = new Calorie({
    user_id,
    year,
    month,
    day,
    description,
    category,
    amount
  });

  newCalorie.save()
    .then(calorie => {
      res.status(201).json(calorie);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to add calorie item' });
    });
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;

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

app.get('/report/', (req, res) => {
  const { user_id, year, month } = req.query;

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

app.get('/about/', (req, res) => {
  const developers = [
    { firstname: "Sharon", lastname: "George", id: 322211368, email: "sharong0602@gmail.com" },
    { firstname: "Shir", lastname: "Goldstein", id: 318493384, email: "goldshir97@gmail.com" }
  ]; 

  res.json(developers);
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});