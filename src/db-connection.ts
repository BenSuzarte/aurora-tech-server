import * as mysql from 'mysql2';

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '021005',
  database: 'auroratech',
});

export default { conn: conn, mysql: mysql};