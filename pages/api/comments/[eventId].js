import { emailChars } from "./../../../helpers/api-util";
import {
  connectDatabase,
  insertDocument,
  getAllDocument,
} from "../../../helpers/db-utils";

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    const client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    const { name, email, text } = req.body;

    if (
      !name ||
      name.trim() === "" ||
      !emailChars(email) ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid inputs" });
      client.close();
      return;
    }
    const newComment = {
      name,
      email,
      text,
      eventId,
    };
    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Comment added!", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "inserting comment failed!" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocument(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed!" });
    }
  }
  client.close();
}

export default handler;
