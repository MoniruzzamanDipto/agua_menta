import { dateFormat } from "../clientFunctions";
import url from "url";
import path from "path";
import sendMail from "../sendEmail";

function giftcardTemplate(data) {
  const content = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div
      class="giftcard_root"
      style="
        min-width: 350px;
        max-width: 600px;
        overflow: hidden;
      "
    >
      <div
        class="giftcard"
        style="
          min-width: 350px;
          max-width: 600px;
          background-color: #fff8ffcf;
          border: 1px solid #8a8888;
          border-radius: 10px;
          padding: 15px;
          overflow: hidden;
        "
      >
        <h4 style="margin-bottom: 10px; font-size: 18px">
          Hello ${data.recipient}
        </h4>
        <p style="margin-bottom: 10px">
          ${data.name} has given you a Agua Menta E-gift card!
        </p>
        <img
          src="cid:cardImage"
          alt="${data.image}"
          style="
            width: 100%;
            height: auto;
            margin: 10px auto 20px;
            outline: 5px solid #fff;
          "
        />
        <p style="margin-bottom: 10px">
          <em>${data.message}</em>
        </p>
        <div
          class="list"
          style="width: 100%; border-bottom: 1px solid #333; padding: 6px 0"
        >
          <span>Card number:</span>
          <span style="float: right">${data.code}</span>
        </div>
        <div
          class="list"
          style="width: 100%; border-bottom: 1px solid #333; padding: 6px 0"
        >
          <span>Amount:</span>
          <span style="float: right">$${data.amount}</span>
        </div>
        <div
          class="list"
          style="width: 100%; border-bottom: 1px solid #333; padding: 6px 0"
        >
          <span>Expiration date:</span>
          <span style="float: right">${dateFormat(data.expiryDate)}</span>
        </div>
      </div>
    </div>
  </body>
</html>
`;

  const parsedUrl = url.parse(data.image);
  const pathname = parsedUrl.pathname;

  // Extract the last file name
  const fileName = path.basename(pathname);

  const attachments = [
    {
      filename: fileName,
      path: `${process.cwd()}/public/images/giftcard/${fileName}`,
      cid: "cardImage",
    },
  ];
  return { content, attachments };
}

export const sendGiftCardMail = async (data) => {
  const mailBody = giftcardTemplate(data);
  const mailOptions = {
    to: data.email,
    subject: `${data.name} has given you a Agua Menta E-gift card!`,
    type: "html",
    content: mailBody.content,
    attachments: mailBody.attachments,
  };
  const { success } = await sendMail(mailOptions);
  return success;
};
