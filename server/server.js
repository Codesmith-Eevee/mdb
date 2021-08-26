require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 4000;
const myRoutes = require('./routes/api');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(cookieParser());

app.use('/api', myRoutes);

// serve index.html on the route '/'
app.get('/',  (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

/**
 * 404 handler
 */
app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});
      
/**
* Global error handler
*/
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

      
app.listen(PORT, ()=>{ console.log(`Magic happening on port ${PORT}...`); })
      
module.exports = app;