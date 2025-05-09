
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const users = []; // This will store users in memory

// Example route
app.get('/', (req, res) => {
  res.send('Hello, backend world!');
});

// Signup route
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

      // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {username: username, password: hashedPassword};

    users.push(newUser);

    res.status(201).json({ message: 'User created successfully' });
    console.log(`user ${username} signed up`)
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

