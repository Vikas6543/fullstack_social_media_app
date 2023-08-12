const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cls = require('cli-color');
const path = require('path');

// .env configuaration
dotenv.config();

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
mongoose.set('strictQuery', false);

// Connect to Mongo DB
const connect_DB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(cls.cyanBright('MongoDB Connected...'));
  } catch (error) {
    console.log(cls.redBright(error));
  }
};

connect_DB();

// Routes
app.use('/user', require('./routes/userRoute'));
app.use('/post', require('./routes/postRoute'));

// configuarations for deployment to vercel
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
  );
}

// app listen
const PORT = process.env.PORT || '5000';
app.listen(PORT, () => {
  console.log(cls.yellowBright(`Server is running on port ${PORT}`));
});
