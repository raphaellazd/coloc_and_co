// Service de connexion à ma BDD pg
import pg from 'pg';

const { Client } = pg;

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'colocnco',
  user: 'admin_coloc',
  password: 'colocnco',
});

client.connect();

export default client;
