import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./StartGame.css";
import { Box, Modal } from "@mui/material";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import {
  getAnswer,
  reloadStorage,
  savePlayer1,
  savePlayer2,
  savePlayerToList,
} from "../../counterSlice";
import { useNavigate } from "react-router-dom";

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
const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const StartGame = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [namePlayer1, setNamePlayer1] = useState("");
  const [namePlayer2, setNamePlayer2] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const page = useNavigate();
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  useEffect(() => {
    localStorage.clear();
    dispatch(reloadStorage());
  }, []);

  const handleChangePlayer1 = (e) => {
    setNamePlayer1(e.target.value);
  };

  const handleChangePlayer2 = (e) => {
    setNamePlayer2(e.target.value);
  };

  const saveNamePlayer = () => {
    // setIsLoading(true);
    handleOpen2(true);
    dispatch(savePlayer1(namePlayer1));
    dispatch(savePlayer2(namePlayer2));
    dispatch(savePlayerToList());
    dispatch(getAnswer()).then(() => page("/gameScreen"));

    // handleClose();
  };

  return (
    <div>
      <h1>Funny Game</h1>
      <div className="btn-start-game">
        <Stack spacing={2} direction="row">
          <Button onClick={handleOpen} variant="contained">
            Start Game
          </Button>
        </Stack>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="header-create-game">
              <div>Create Game</div>
              <div style={{ cursor: "pointer" }} onClick={handleClose}>
                X
              </div>
            </div>
            <div className="line-create-game"></div>
            <div className="input-player-wrapper">
              <div>Player 1</div>
              <input
                onChange={handleChangePlayer1}
                value={namePlayer1}
                className="input-player"
              />
            </div>
            <div className="input-player-wrapper">
              <div>Player 2</div>
              <input
                onChange={handleChangePlayer2}
                value={namePlayer2}
                className="input-player"
              />
            </div>
            <div className="btn-submit-create-game">
              <Stack spacing={2} direction="row">
                <Button onClick={saveNamePlayer} variant="contained">
                  {/* {isLoading && (
                    <CircularProgress
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "yellow",
                        marginRight: "15px",
                      }}
                    />
                  )} */}
                  Submit
                </Button>
              </Stack>
              <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style2}>
                  <div className="icon-shuffle">
                    <span>Match 1</span>
                    <FontAwesomeIcon icon={faShuffle} />
                  </div>
                </Box>
              </Modal>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default StartGame;
