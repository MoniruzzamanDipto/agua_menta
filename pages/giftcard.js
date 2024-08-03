import HeadData from "~/components/Head";
import { formField } from "~/lib/clientFunctions";
import classes from "../styles/pages.module.css";
import { useTranslation } from "react-i18next";
import c from "~/styles/giftcard.module.css";
import { useRef, useState } from "react";
import ImageLoader from "~/components/Image";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { ecardCart } from "~/lib/cartHandle";

const GiftCard = () => {
  const { t } = useTranslation();
  const images = ["01.png", "02.png", "03.png"];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [show, setShow] = useState(false);
  const [giftCardData, setGiftCardData] = useState({});
  const form = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = formField(e.target.elements);
    data.image = `${process.env.NEXT_PUBLIC_URL}/images/giftcard/${selectedImage}`;
    data.amount = selectedAmount;
    data.type = "ecard";
    console.log(data);
    ecardCart(data, dispatch);
  };

  const handlePreview = () => {
    const data = formField(form.current.elements);
    data.image = selectedImage;
    data.amount = selectedAmount;
    setGiftCardData(data);
    setShow(true);
  };

  return (
    <>
      <HeadData title="E-Gift Card" />
      <div className="layout_top custom_container">
        <br />
        <br />
        <div className="row">
          <div className="col-md-6">
            <h1 className={`${classes.heading} text-start pt-1 ps-2 pb-2`}>
              {t("E-Gift Card")}
            </h1>
            <div className={c.preview}>
              {selectedImage && (
                <Image
                  src={`/images/giftcard/${selectedImage}`}
                  width={800}
                  height={600}
                  alt={selectedImage}
                  style={{ width: "100%", height: "auto" }}
                  quality={100}
                />
              )}
            </div>
          </div>
          <div className="col-md-6">
            <form className="form" onSubmit={handleSubmit} ref={form}>
              <div className={c.input}>
                <h5>Gift card design</h5>
                <p>Select the style</p>
                <ul className={c.images}>
                  {images.map((x, i) => (
                    <li
                      key={i}
                      onClick={() => setSelectedImage(x)}
                      data-active={x === selectedImage}
                    >
                      <ImageLoader
                        width={80}
                        height={60}
                        src={`/images/giftcard/${x}`}
                      />
                    </li>
                  ))}
                </ul>
                <h5>Enter your gift card details </h5>
                <p>Amount</p>
                <ul className={c.amount}>
                  <li
                    onClick={() => setSelectedAmount(25)}
                    data-active={selectedAmount === 25}
                  >
                    $25
                  </li>
                  <li
                    onClick={() => setSelectedAmount(50)}
                    data-active={selectedAmount === 50}
                  >
                    $50
                  </li>
                  <li
                    onClick={() => setSelectedAmount(75)}
                    data-active={selectedAmount === 75}
                  >
                    $75
                  </li>
                  <li
                    onClick={() => setSelectedAmount(100)}
                    data-active={selectedAmount === 100}
                  >
                    $100
                  </li>
                </ul>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Custom Amount</label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        className="form-control"
                        step="1"
                        min={25}
                        onChange={(e) => setSelectedAmount(+e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Your Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Recipient&apos;s Name*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="recipient"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Recipient&apos;s Email*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Message*</label>
                      <textarea
                        className="form-control"
                        name="message"
                        maxLength="230"
                        placeholder="230 characters only"
                        rows={4}
                        required
                        defaultValue="Hope you enjoy this Gift Card!"
                      />
                    </div>
                  </div>
                </div>

                <button className="btn btn-success m-1" type="submit">
                  Add to cart
                </button>
                <button
                  className="btn btn-primary m-1"
                  type="button"
                  onClick={handlePreview}
                >
                  Card preview
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {show && (
        <div
          className={c.giftcard_root}
          onClick={() => setShow(false)}
          title="Click to close"
        >
          <GiftCardCard data={giftCardData} />
        </div>
      )}
    </>
  );
};

function GiftCardCard({ data }) {
  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() + 3);
  const formattedDate = currentDate.toLocaleDateString();

  return (
    <div className={c.giftcard}>
      <h4>Hello {data.recipient || "XYZ"}</h4>
      <p>{data.name || "Your Name"} has given you an E-gift card!</p>
      <Image
        src={`/images/giftcard/${data.image}`}
        alt=""
        width={500}
        height={500}
        style={{ width: "100%", height: "auto" }}
      />
      <p>
        <em>{data.message}</em>
      </p>
      <div className={c.list}>
        <span>Card number:</span>
        <span>1234 XXXX XXXX XXXX</span>
      </div>
      <div className={c.list}>
        <span>Amount:</span>
        <span>${data.amount}</span>
      </div>
      <div className={c.list}>
        <span>Expiration date:</span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
}

export default GiftCard;
