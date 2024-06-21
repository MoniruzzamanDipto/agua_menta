import { Eye, Trash, Trash2 } from "@styled-icons/bootstrap";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import GlobalModal from "~/components/Ui/Modal/modal";
import PageLoader from "~/components/Ui/pageLoader";
import classes from "~/components/tableFilter/table.module.css";
import { dateFormat, deleteData } from "~/lib/clientFunctions";

const DataTable = dynamic(() => import("react-data-table-component"));
const FilterComponent = dynamic(() => import("~/components/tableFilter"));

const Newsletter = () => {
  const [nList, setNList] = useState({ data: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedN, setSelectedN] = useState("");
  const updateData = useRef();
  const openModal = (id) => {
    setSelectedN(id);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  function updatePageData() {
    updateData.current.update();
  }

  const deleteUser = async () => {
    setIsOpen(false);
    await deleteData(`/api/admin/contact`, { id: selectedN })
      .then((data) =>
        data.success
          ? (toast.success("Message Deleted Successfully"), updatePageData())
          : toast.error("Something Went Wrong"),
      )
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong");
      });
  };

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = nList.data.filter(
    (item) =>
      item.email && item.email.toLowerCase().includes(filterText.toLowerCase()),
  );
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        placeholder="Email"
      />
    );
  }, [filterText, resetPaginationToggle]);

  const columns = [
    {
      name: "Name",
      selector: (row) => <span title={row.name}>{row.name}</span>,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => <span title={row.email}>{row.email}</span>,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => dateFormat(row.date),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <div className={classes.button} onClick={() => openModal(row._id)}>
            <Trash width={25} height={25} title="DELETE" />
          </div>
          <Link href={`/dashboard/contact/${row._id}`}>
            <Eye width={25} height={25} title="VIEW" />
          </Link>
        </div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "92px",
        fontSize: "13px",
      },
    },
    headCells: {
      style: {
        fontSize: "15px",
      },
    },
  };

  return (
    <PageLoader url="/api/admin/contact" setData={setNList} ref={updateData}>
      <div>
        <h4 className="text-center pt-3 pb-5">Messages</h4>
        <div className={classes.container}>
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
            customStyles={customStyles}
          />
          <GlobalModal
            isOpen={isOpen}
            handleCloseModal={closeModal}
            small={true}
          >
            <div className={classes.modal_icon}>
              <Trash2 width={100} height={100} />
              <p>Are you sure, you want to delete?</p>
              <div>
                <button
                  className={classes.danger_button}
                  onClick={() => deleteUser()}
                >
                  Delete
                </button>
                <button
                  className={classes.success_button}
                  onClick={() => closeModal()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </GlobalModal>
        </div>
      </div>
    </PageLoader>
  );
};

Newsletter.requireAuthAdmin = true;
Newsletter.dashboard = true;

export default Newsletter;