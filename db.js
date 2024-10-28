//database connections
//const { Client } = require('pg');
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host:"localhost",
  user:"postgres",
  port:"5432",
  password:"admin123",
  database:"postgres"
})

client.connect();

export default client;  //this module are use to ready for another file