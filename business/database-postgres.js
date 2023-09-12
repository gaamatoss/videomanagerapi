import { randomUUID } from "node:crypto";
import { sql } from "./sql.js";

export class DatabasePostgres {
  async create(video) {
    const videoId = randomUUID();

    const { title, description, duration } = video;

    await sql`insert into videos (id, title, description, duration) values (${videoId}, ${title},${description}, ${duration})`;
  }

  async update(id, video) {
    const { title, description, duration } = video;

    await sql`UPDATE videos
      SET title = ${title},
      description = ${description},
      duration = ${duration}
      WHERE id ilike ${"%" + id + "%"};`;
  }

  async delete(id) {
    await sql`DELETE FROM videos WHERE id ilike ${"%" + id + "%"}; `;
  }

  async list(search) {
    let videos;
    if (search) {
      videos = await sql`select * from videos where title ilike ${
        "%" + search + "%"
      }`;
    } else {
      videos = await sql`select * from videos`;
    }

    return videos;
  }
}
