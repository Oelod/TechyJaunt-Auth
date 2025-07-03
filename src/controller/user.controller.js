
const User = require('../model/user.schema');
const bcrypt = require('bcrypt');



// Create a new user with uniqueness check
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }
  if(password.length < 6){
    return res.status(400).json({error: 'Password must be atleast 6 character long'});
  }

  try {
    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists.' });
    }

    // 3. Create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
  name,
  email,
  password: hashedPassword
});

    // 4. Respond (omit password)
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};



// LOGIN CONTROLLER
const login = async (req, res) => {
  const { email, password } = req.body;

  // 1. Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // 2. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // 4. Success response (you could return a JWT here)
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};


// Make a user an admin by ID
const makeAdmin = async (req, res) => {
  const { userId } = req.params;


  try {
    // Find and update the user's admin field
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { admin: true },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User is now an admin',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        admin: updatedUser.admin
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

module.exports = {
  signup,
  login,
  makeAdmin
  
};
