import { useTranslation } from "react-i18next";
import HeadData from "~/components/Head";
import ProductGuideMenu from "~/components/productGuide/menu";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import data from "./../data.json";
import Accordion from "~/components/Ui/Accordion";
import ImageLoader from "~/components/Image";
export default function ProductGuideSize() {
  const { t } = useTranslation();

  return (
    <>
      <HeadData title="Product Size Guide" />
      <div className="layout_top">
        <div className="custom_container">
          <h1 className="h2 py-4 mt-3">Product size guide</h1>
          <div className="row">
            <div className="col-md-3">
              <ProductGuideMenu />
            </div>
            <div className="col-md-9">
              <Tabs>
                <TabList>
                  <Tab>{t("Women")}</Tab>
                  <Tab>{t("Men")}</Tab>
                  <Tab>{t("Kids")}</Tab>
                </TabList>
                {data.productGuide.map((r, t) => (
                  <TabPanel key={t}>
                    {r.data.map((item, index) => (
                      <div key={index}>
                        <h4
                          className="h4 py-4 mb-0"
                          style={{
                            borderBottom: "1px solid var(--border_color)",
                          }}
                        >
                          {item.category}
                        </h4>
                        {item.table.map((table, idx) => (
                          <Accordion title={table.title} key={idx} simpleStyle>
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  {table.header.map((title, i) => (
                                    <th
                                      scope="col"
                                      key={i}
                                      className="text-warning"
                                    >
                                      {title}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {table.data.map((data, index) => (
                                  <tr key={index}>
                                    {Object.entries(data).map((entry, x) => (
                                      <td key={x}>
                                        {typeof entry[1] === "object"
                                          ? `${entry[1]?.min} - ${entry[1]?.max}`
                                          : entry[1]}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {table.details && (
                              <div className="row py-4">
                                <div className="col-md-8">
                                  <h4 className="h5 mb-3 fw-light">
                                    HOW TO MEASURE
                                  </h4>
                                  {table.details.qna.map((a, b) => (
                                    <div key={b}>
                                      <h5 className="h6 text-warning text-uppercase">
                                        <span className="ball">
                                          {String.fromCharCode(65 + b)}
                                        </span>
                                        {a.q}
                                      </h5>
                                      <p>{a.a}</p>
                                    </div>
                                  ))}
                                </div>
                                <div className="col-md-4">
                                  <ImageLoader
                                    src={table.details.image}
                                    alt={table.title}
                                    width={230}
                                    height={500}
                                  />
                                </div>
                              </div>
                            )}
                          </Accordion>
                        ))}
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
