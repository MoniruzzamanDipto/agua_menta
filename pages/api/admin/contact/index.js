import sessionChecker from "~/lib/sessionPermission";
import Contact from "~/models/contact";
import dbConnect from "~/utils/dbConnect";

export default async function apiHandler(req, res) {
  const { method } = req;
  if (!(await sessionChecker(req, "general")))
    return res
      .status(403)
      .json({ success: false, message: "Access Forbidden" });

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        let data;
        if (req.query.id) {
          data = await Contact.findById(req.query.id);
        } else {
          data = await Contact.find({});
        }
        res.status(200).json({
          success: true,
          data,
        });
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        await Contact.findOneAndDelete({ _id: req.body.id });
        res.status(200).json({ success: true });
      } catch (err) {
        console.log(err);
        res.status(200).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
