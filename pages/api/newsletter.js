import { emailChars } from "./../../helpers/api-util";
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const clientEmail = req.body.email;
    if (!emailChars(clientEmail)) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://pashootan:<password>@cluster0.9lsnp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      { useUnifiedTopology: true }
    );
    const db = client.db("myFirstDatabase");

    await db.collection("emails").insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
