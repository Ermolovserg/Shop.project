import mysql, { Connection } from "mysql2/promise";
const host = process.env.LOCAL_HOST;
const port = Number(process.env.LOCAL_API_PORT);
const password = process.env.LOCAL_PASSWORD;
const user = process.env.LOCAL_USER;
const database = process.env.LOCAL_DATABASE;

export async function initDataBase(): Promise<Connection | null> {
  let connection: Connection | null = null;

  try {
    connection = await mysql.createConnection({
      host: host,
      port: port,
      user: user,
      password: password,
      database: database
    });
  } catch (e) {
    console.error(e.message || e);
    return null;
  }

  console.log(`Connection to DB ProductsApplication established`);

  return connection;
}
