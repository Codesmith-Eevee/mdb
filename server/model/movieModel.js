require('dotenv').config();
const { Pool } = require('pg');

// link to database
const myURI = 'postgres://cialwcxn:GYxMgfa2Xw6GIpiQN6v_06pDEjmRS_D8@kashin.db.elephantsql.com/cialwcxn';
const URI = process.env.PG_URI || myURI;

// database connection
const pool = new Pool({
  connectionString: URI,
});

// exporting pool query
module.exports = {
    query: (text, params, callback) => {
        console.log('executed query:', text);
        return pool.query(text, params, callback);
    }
};



