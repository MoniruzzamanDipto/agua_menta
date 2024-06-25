import { useTranslation } from "react-i18next";
import HeadData from "~/components/Head";
import ProductGuideMenu from "~/components/productGuide/menu";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import data from "../data.json";
import Accordion from "~/components/Ui/Accordion";
import ImageLoader from "~/components/Image";
import { useState } from "react";
export default function ProductGuideSize() {
  const [selectedItem, setSelectedItem] = useState({});
  const { t } = useTranslation();

  return (
    <>
      <HeadData title="Product Fabrics Guide" />
      <div className="layout_top">
        <div className="custom_container">
          <h1 className="h2 py-4 mt-3">Product Care guide</h1>
          <div className="row">
            <div className="col-md-3">
              <ProductGuideMenu />
            </div>
            <div className="col-md-9">
              <div className="row">
                <h4>Washing symbols</h4>
                <p>
                  Follow the washing instructions carefully to keep your
                  Calzedonia garments looking great for a long time.
                </p>
                {data.care.map((cat, idx) => (
                  <div className="col-md-3 text-center" key={idx}>
                    <div className="d-flex flex-column">
                      <div className="d-block">
                        <div className={"style-btn"}>
                          <ImageLoader
                            src={cat.image}
                            alt={cat.title}
                            height={80}
                            width={80}
                            style={{
                              width: "auto",
                              height: "100%",
                              maxWidth: "42px",
                            }}
                          />
                        </div>
                        <p>{cat.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}
