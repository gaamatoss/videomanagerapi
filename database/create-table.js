import { sql } from "./sql.js";

sql`DROP TABLE IF EXISTS videos`.then(() => {
  console.log("table droped");
});

sql`
  CREATE TABLE videos (
    id          TEXT PRIMARY KEY,
    title       TEXT,
    description TEXT,
    duration    INTEGER
  );
`.then(() => {
  console.log("table created");
});
