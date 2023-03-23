import React, { useState, useEffect } from "react";
import "./index.scss";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { GetClientList } from "../../App/Redux/Actions/WalletActions";
import { getTransactions } from "../../App/Redux/Actions/TransactionAction";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TransactionDetails from "../TransactionDetails";
// const validationSchema = yup.object().shape({
//   startDate: yup.string().required("Required !"),
//   endDate: yup.string().required("Required !"),
//   transactionType: yup.string().required("Required !"),
//   status: yup.string().required("Required !"),
// });
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

const dummyData = [
  {
    Balance: "60",
    Date: "2023-03-18",
    Deposit: "30",
    Note: "Commission",
    Remarks: null,
    Withdraw: "0",
  },
  {
    Balance: "1000",
    Date: "2023-03-19",
    Deposit: "0",
    Note: "Commission",
    Remarks: null,
    Withdraw: "50",
  },
  {
    Balance: "300",
    Date: "2023-03-20",
    Deposit: "30",
    Note: "Commission",
    Remarks: null,
    Withdraw: "0",
  },
  {
    Balance: "890",
    Date: "2023-03-21",
    Deposit: "0",
    Note: "Commission",
    Remarks: null,
    Withdraw: "310",
  },
];

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function createTimeStamp(myDate) {
  myDate = myDate.split("-");
  let newDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);
  return newDate.getTime();
}

function Passbook() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [submitedInput, setSubmitedInput] = useState({});
  const [currentSelectedTransaction, setCurrentSelectedTransaction] =
    useState();
  const [openTransactionDetail, setOpenTransactionDetail] = useState(false);

  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [filterMode, setFilterMode] = useState(false);
  const [dummyfilteredData, setDummyfilteredData] = useState([]);

  const ClientList = useSelector((state) => state?.HawalaReducer?.client_list);
  const TransactionList = useSelector(
    (state) => state?.transactionData?.transactions?.data
  );
  const userId = useSelector((state) => state?.user?.userDetail?.id);

  const dateAfterYear = new Date();
  dateAfterYear.setFullYear(inputValue.startDate.getFullYear() + 1);
  useEffect(() => {
    dispatch(
      getTransactions({
        start_date: null,
        end_date: null,
        user_id: 3,
        skip: 1,
        take: 10,
      })
    );
  }, []);

  const filterData = (minDate, maxDate, Data) => {
    const arr = minDate.split("-");
    arr[2] = (Number(arr[2]) - 1).toString();
    const newMinDate = arr.join("-");
    const min = Date.parse(newMinDate);
    const max = Date.parse(maxDate);
    const filteredData = Data?.filter(
      (obj) =>
        createTimeStamp(obj.Date) >= min && createTimeStamp(obj.Date) <= max
    );
    return filteredData;
  };

  useEffect(() => {
    if (submitedInput !== {}) {
      const temp = filterData(
        formatDate(submitedInput.startDate),
        formatDate(submitedInput.endDate),
        TransactionList
      );

      setDummyfilteredData([...temp]);
    }
  }, [submitedInput]);
  console.log(TransactionList, "TransactionList");
  return (
    <div className="passbook-main">
      <div className="passbook-head">
        <div className="passbook-title">
          <Link to={"/"} className="passbook_subtitle">
            <ArrowCircleLeftIcon />
          </Link>
          <div className="passbook_subtitle">Passbook</div>
        </div>
      </div>
      <div className="passbook-body">
        <div className="passbook-body-head">
          <div style={{ fontSize: "18px" }}>Transactions</div>

          <button
            onClick={() => setIsFilterClicked(true)}
            style={{ backgroundColor: "#2f354b" }}
          >
            Filter
          </button>
        </div>

        <div className="transaction-data">
          {dummyfilteredData.length === 0 && filterMode ? (
            <>
              <div>{"No data available between these dates"}</div>
              <button
                className="cancel-filter-button"
                onClick={() => setFilterMode(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <TableContainer
              component={Paper}
              sx={{ backgroundColor: "#2f354b", border: "1px solid #fff" }}
            >
              <Table sx={{ maxWidth: 20 }} aria-label="simple table">
                <TableHead>
                  <TableRow className="tableRow">
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Deposit</TableCell>
                    <TableCell>Withdraw</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummyfilteredData.length !== 0 ? (
                    <>
                      {dummyfilteredData?.map((transaction, idx) => (
                        <TableRow
                          key={idx}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          className="tableRow"
                        >
                          <TableCell component="th" scope="row">
                            {transaction.Date}
                          </TableCell>

                          <TableCell align="right">
                            {transaction.Balance}
                          </TableCell>
                          <TableCell align="right">
                            {transaction.Deposit}
                          </TableCell>
                          <TableCell align="right">
                            {transaction.Withdraw}
                          </TableCell>
                          <TableCell align="right">
                            <button
                              className="detail-button"
                              onClick={() => {
                                setCurrentSelectedTransaction(transaction);
                                setOpenTransactionDetail(true);
                              }}
                            >
                              Details
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <button
                        className="cancel-filter-button"
                        onClick={() => {
                          setFilterMode(false);
                          setIsFilterClicked(false);
                          setDummyfilteredData([]);
                        }}
                      >
                        Cancel Filter
                      </button>
                    </>
                  ) : (
                    TransactionList?.map((transaction, idx) => (
                      <TableRow
                        key={idx}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        className="tableRow"
                      >
                        <TableCell component="th" scope="row">
                          {transaction.Date}
                        </TableCell>

                        <TableCell align="right">
                          {transaction.Balance}
                        </TableCell>
                        <TableCell align="right">
                          {transaction.Deposit}
                        </TableCell>
                        <TableCell align="right">
                          {transaction.Withdraw}
                        </TableCell>
                        <TableCell align="right">
                          <button
                            className="detail-button"
                            onClick={() => {
                              setCurrentSelectedTransaction(transaction);
                              setOpenTransactionDetail(true);
                            }}
                          >
                            Details
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
        {isFilterClicked && (
          <div>
            <div className="passbook-body-date">
              <DatePicker
                selectsStart
                label="from"
                selected={inputValue.startDate}
                onChange={(e) => {
                  console.log(e, "e");
                  setInputValue({ ...inputValue, startDate: e });
                }}
              />
              <DatePicker
                selectsEnd
                selected={inputValue.endDate}
                onChange={(e) => setInputValue({ ...inputValue, endDate: e })}
                maxDate={dateAfterYear}
              />
            </div>

            <div className="passbook-body-button">
              <button
                onClick={() => {
                  setIsFilterClicked(false);
                  setInputValue({
                    startDate: new Date(),
                    endDate: new Date(),
                  });
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSubmitedInput(inputValue);
                  setIsFilterClicked(false);
                  setInputValue({
                    startDate: new Date(),
                    endDate: new Date(),
                  });
                  setFilterMode(true);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
      <TransactionDetails
        openTransactionDetail={openTransactionDetail}
        setOpenTransactionDetail={setOpenTransactionDetail}
        details={currentSelectedTransaction}
      />
    </div>
  );
}

export default Passbook;
