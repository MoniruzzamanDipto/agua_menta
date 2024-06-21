import { useRouter } from "next/router";
import { useState } from "react";
import PageLoader from "~/components/Ui/pageLoader"
import { dateFormat } from "~/lib/clientFunctions";

export default function RegOrder() {
  const [message, setMessage] = useState({
    data: {},
  });
  const router = useRouter();
  
  if (!router.query.id) {
    return null;
  }
  return (
    <PageLoader
      url={`/api/admin/contact?id=${router.query.id}`}
      setData={setMessage}
      ref={null}
    >
      {message.data._id && (
        <div className="content">
          <div className="card card-default">
            <div className="card-header bg-dark card-header-border-bottom">
              <h2 className="text-white">Message Details</h2>
            </div>
            <div className="card-body mxcd __msg">
              <label>Date:</label>
              <p>{dateFormat(message.data.date)}</p>
              <label>Name:</label>
              <p>{message.data.name}</p>
              <label>Email:</label>
              <p>{message.data.email}</p>
              <label>Phone:</label>
              <p>{message.data.phone}</p>
              <label>Subject:</label>
              <p>
                <em>{message.data.subject}</em>
              </p>
              <label>Message:</label>
              <pre>{message.data.message}</pre>
            </div>
          </div>
        </div>
      )}
    </PageLoader>
  );
}

RegOrder.requireAuthAdmin = true;
RegOrder.dashboard = true;