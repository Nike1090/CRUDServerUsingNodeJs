const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();

// MongoDB database Connection
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware
app.use(bodyParser.json());

// User schema
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    validate: /^[A-Za-z\s]+$/
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: /^\S+@\S+\.\S+$/
  },
  password: {
    type: String,
    required: true,
    validate: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  },
});

const User = mongoose.model('User', UserSchema);

// API Endpoints
app.post('/user/create', async (req, res) => {
  try {
    // Validating and hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Creating a new user
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid email or password' });
  }
});

app.put('/user/edit', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.body.fullName) {
      user.fullName = req.body.fullName;
    }

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.save();

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid full name or password' });
  }
});

app.delete('/user/delete', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error 500' });
  }
});

app.get('/user/getAll', async (req, res) => {
  try {
    const users = await User.find({}, 'fullName email password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error 500' });
  }
});

// Starting the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
