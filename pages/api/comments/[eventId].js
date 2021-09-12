import { emailChars } from "./../../../helpers/api-util";

function handler(req, res) {
  const eventId = req.query.eventId;

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
      return;
    }
    const newComment = {
      id: new Date().toISOString(),
      name,
      email,
      text,
    };
    console.log(newComment);

    res.status(201).json({ message: "Comment added!", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Max", text: "1st comment" },
      { id: "c2", name: "tommy", text: "2nd comment" },
    ];
    res.status(200).json({ comments: dummyList });
  }
}

export default handler;
