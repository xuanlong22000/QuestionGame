import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { results } from "../../counterSlice";
import "./Result.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Result = () => {
  const result = useSelector(results);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const lisResult = Object.values(result);
  console.log(lisResult);

  const filterPosts = lisResult.filter((result) =>
    result.namePlayer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="header-result-wrapper">
        <div className="text-result">Result Game</div>
        <Stack spacing={2} direction="row">
          <Button onClick={handleOpen} variant="contained">
            Finally
          </Button>
        </Stack>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{ textAlign: "center", fontSize: "40px" }}>
              {lisResult[0].score > lisResult[1].score
                ? `Winner : ${lisResult[0].namePlayer}`
                : `Winner : ${lisResult[1].namePlayer}`}
            </div>
          </Box>
        </Modal>
      </div>

      <div className="line-create-game"></div>
      <div className="input-search-wrapper">
        <input
          className="input-search"
          placeholder="Search Player"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ userSelect: "none" }}>Player </TableCell>
              <TableCell style={{ userSelect: "none" }}>Answer</TableCell>
              <TableCell style={{ userSelect: "none" }}>Result </TableCell>
              <TableCell style={{ userSelect: "none" }}>Score</TableCell>
              <TableCell style={{ userSelect: "none" }}>Time Finish</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterPosts.map((result, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{result.namePlayer}</TableCell>
                <TableCell>
                  {result.answerPlayer.map((item) => (
                    <div>{item}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {result.answerApi.map((item) => (
                    <div>{item}</div>
                  ))}
                </TableCell>
                <TableCell>{result.score}</TableCell>
                <TableCell>{result.timeFinish}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Result;
