import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";
const server = fastify();

server.listen({
  port: 3000,
});

const database = new DatabasePostgres();

server.post("/videos", async (req, res) => {
  const { title, description, duration } = req.body;

  await database.create({
    title,
    description,
    duration,
  });

  console.log(database.list());
  return res.status(201).send();
});

server.get("/videos", async (req) => {
  const search = req.query.search;
  const videos = await database.list(search);

  return videos;
});

server.put("/videos/:id", (req, res) => {
  const videoId = req.params.id;
  const { title, description, duration } = req.body;

  database.update(videoId, {
    title,
    description,
    duration,
  });

  return res.status(204).send();
});

server.delete("/videos/:id", (req, res) => {
  const videoId = req.params.id;
  database.delete(videoId);

  return res.status(204).send();
});
