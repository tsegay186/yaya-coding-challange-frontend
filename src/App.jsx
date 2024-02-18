import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
// import { searchTransactions } from "./api/api";
import { getTransactions } from "./api/api";

const App = () => {
  const [requestedPages, setRequestedPages] = useState(new Set());
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [count, setCount] = useState(0);

  // const [searching, setSearching] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");

  // query param

  const [p, setP] = useState(1);
  const [transactions, setTransactions] = useState([]);

  const handlePageChange = (event, newPage) => {
    setP(newPage + 1);
    setPageIndex(newPage);
  };

  // const handleSearchInput = (event) => {
  //   setSearching(!!event.target.value);
  //   setSearchTerm(event.target.value);
  // };

  const emptyRows =
    pageIndex > 0
      ? Math.max(0, (1 + pageIndex) * rowsPerPage - transactions.length)
      : 0;

  useEffect(() => {
   gettTransactions(p);
  }, [p]);

  // const handleSearch = async () => {
  //      requestedPages.clear()
  //      setTransactions(transactions => transactions.filter(transaction => transaction === false))
  //      searchTrans(searchTerm, 1);
  // };

  // const searchTrans = async (searchTerm, p) => {
  //   try {
  //     const checkIfItwasRequested = requestedPages.has(p);
  //     if (!checkIfItwasRequested) {
  //       const result = await searchTransactions(searchTerm, p);
  //       const counts = result?.pageSize * result.itemsPerPage
  //       setRequestedPages(new Set([...requestedPages, p]))
  //       if(p===1){
  //         setCount(counts)
  //         setRowsPerPage(result?.itemsPerPage)
  //       }else{
  //         console.log(count)
  //       }
  //       setTransactions([transactions, ...result.transactions])

  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }

  // };

  const gettTransactions = async (p) => {
    try {
      const checkIfItwasRequested = requestedPages.has(p);
      if (!checkIfItwasRequested) {
        const data = await getTransactions(p);
        data && setRequestedPages(new Set([...requestedPages, p]));
        setTransactions([...transactions, ...data.transactions]);
        !rowsPerPage && setRowsPerPage(data?.itemsPerPage);
        !count && setCount(data?.pageSize * data.itemsPerPage);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Paper sx={{ display: "flex", flexDirection: "column" }}>
      <Stack
        sx={{
          margin: "20px",
          gap: "14px",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        flexDirection="row"
        align="end"
      >
        {/* <TextField
          placeholder="search by cause, sender, or reciever"
          value={searchTerm}
          onChange={handleSearchInput}
        />
        <Button
          sx={{ padding: "4px", height: "55px" }}
          disableElevation
          size="small"
          disabled={!searching}
          variant="outlined"
          onClick={handleSearch}
        >
          {" "}
          Search The Database
        </Button> */}
      </Stack>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Transaction Id</TableCell>
              <TableCell align="center">Sender</TableCell>
              <TableCell align="center">Receiver</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Currency</TableCell>
              <TableCell align="center">Cause</TableCell>
              <TableCell align="center">Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? transactions.slice(
                  pageIndex * rowsPerPage,
                  pageIndex * rowsPerPage + rowsPerPage
                )
              : transactions
            ).map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell align="center">{transaction?.id}</TableCell>
                <TableCell align="center">
                  {transaction?.sender?.name}
                </TableCell>
                <TableCell align="center">
                  {transaction?.receiver?.name}
                </TableCell>
                <TableCell align="center">{transaction?.amount}</TableCell>
                <TableCell align="center">{transaction?.currency}</TableCell>
                <TableCell align="center">{transaction?.cause}</TableCell>
                <TableCell align="center">
                  {transaction?.created_at_time}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={count}
          page={pageIndex}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
        />
      </TableContainer>
    </Paper>
  );
};

export default App;
