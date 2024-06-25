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
      <HeadData title="Product Style Guide" />
      <div className="layout_top">
        <div className="custom_container">
          <h1 className="h2 py-4 mt-3">Product style guide</h1>
          <div className="row">
            <div className="col-md-3">
              <ProductGuideMenu />
            </div>
            <div className="col-md-9">
              <Tabs>
                <TabList>
                  <Tab>{t("Women")}</Tab>
                  <Tab>{t("Men")}</Tab>
                </TabList>
                {data.styleGuide.map((r, t) => (
                  <TabPanel key={t}>
                    {r.data.map((item, index) => (
                      <div key={index}>
                        <h4
                          className="h4 py-4 mb-4"
                          style={{
                            borderBottom: "1px solid var(--border_color)",
                          }}
                        >
                          {item.title}
                        </h4>
                        <div className="row">
                          {item.items.map((cat, idx) => (
                            <div className="col-md-3 text-center" key={idx}>
                              <div className="d-flex flex-column">
                                <div
                                  style={{ cursor: "pointer" }}
                                  className="d-block"
                                  onClick={() =>
                                    setSelectedItem({
                                      ...cat,
                                      category: item.title,
                                    })
                                  }
                                >
                                  <div
                                    className={`style-btn ${
                                      selectedItem?.title === cat.title
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    <ImageLoader
                                      src={cat.image}
                                      alt={cat.title}
                                      height={80}
                                      width={80}
                                      style={{
                                        width: "auto",
                                        height: "100%",
                                        maxWidth: "32px",
                                      }}
                                    />
                                  </div>
                                  <p>{cat.title}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {selectedItem?.title &&
                          selectedItem?.category === item.title && (
                            <div className="my-4">
                              <h6>{selectedItem.title}</h6>
                              <p>{selectedItem.description}</p>
                            </div>
                          )}
                      </div>
                    ))}
                    <br />
                    <br />
                    <br />
                  </TabPanel>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
