require('dotenv').config();
const mongoose = require('mongoose');
const College = require('./models/College');
const colleges = require('./data/colleges');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await College.deleteMany({});
    console.log('Cleared existing data');
    const result = await College.insertMany(colleges);
    console.log(`Seeded ${result.length} colleges successfully!`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
