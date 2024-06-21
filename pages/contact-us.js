import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import HeadData from "~/components/Head";
import { formField, postData } from "~/lib/clientFunctions";

export default function ContactUs() {
  const settings = useSelector((state) => state.settings);
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const data = formField(e.target.elements);
      const resp = await postData("/api/home/contact", data);
      if (resp.success) {
        toast.success(
          "Your Message Has Been Sent. Thanks For Contacting With Us."
        );
        e.target.reset();
      } else {
        toast.error(resp.err);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, Please try again later");
    }
  }

  return (
    <>
      <HeadData title={"Contact Us"} />
      <div className="wrapper">
        <div className="py-5 cart-top body-container">
          <div className="col-lg-10 col-12 m-auto">
            <h1 className="h2 mb-2 mt-2">Contact Us</h1>
            <div className="row">
              <div className="col-md-7">
                <form className="mt-1 mb-4" onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      required
                      placeholder=" "
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      required
                      placeholder=" "
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">Mobile Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      required
                      placeholder=" "
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      required
                      placeholder=" "
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      name="message"
                      required
                      placeholder=" "
                      rows={4}
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-success btn-block w-100">
                      Send
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-5">
                <div className="card border-0 p-3 shadow-sm bg-white my-3">
                  <h1 className="h5">Contact Information</h1>
                  <p>
                    <b>Address: </b>
                    <br />
                    {settings.settingsData.address}
                  </p>
                  <p>
                    <b>Phone: </b>
                    <br /> {settings.settingsData.phoneFooter}
                  </p>
                  <p>
                    <b>Email: </b>
                    <br /> {settings.settingsData.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
