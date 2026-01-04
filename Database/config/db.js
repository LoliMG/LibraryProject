import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'root',
  database : 'library' 
});

try {
  connection.connect();
  console.log("connection ok");
}
catch (error) {
  console.log(error);
}

export default connection;