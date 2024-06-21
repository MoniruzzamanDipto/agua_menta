import Contact from "~/models/contact";
import dbConnect from "~/utils/dbConnect";

export default async function apiHandler(
  req,
  res,
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        await Contact.create(req.body);
        res.status(200).json({ success: true });
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, duplicate: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}