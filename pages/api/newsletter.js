import { emailChars } from "./../../helpers/api-util";
import { connectDatabase, insertDocument } from "../../helpers/db-utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const clientEmail = req.body.email;
    if (!emailChars(clientEmail)) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client;

    try {
      const client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
