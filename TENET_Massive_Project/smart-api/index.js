const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const routes = require('./routes');
// const verifyToken = require('./middleware/VerifyToken')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');


const app = express();
app.use(cors())
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); //input form-url
app.use(routes);
// app.use(verifyToken);
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(3000, () => {
  console.log(`Server is running`);
});
