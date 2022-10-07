import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import { Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  indexPlayer,
  indexQuestions,
  listPlayer,
  nextPlayer,
  nextQuestion,
  questions,
  saveResults,
} from "../../counterSlice";
import "./GameScreen.css";

const GameScreen = () => {
  const [answer, setAnswer] = useState("");
  const [time, setTime] = useState(10);
  const [hiddenNextPlayer, setHiddenNextPlayer] = useState(true);
  const [hiddenViewResult, setHiddenViewResult] = useState(true);
  const question = useSelector(questions);
  const indexQuestion = useSelector(indexQuestions);
  const indexPlayers = useSelector(indexPlayer);
  const listPlayers = useSelector(listPlayer);
  const page = useNavigate();
  const dispatch = useDispatch();
  const listAnswers = [
    question[indexQuestion].correct_answer,
    ...question[indexQuestion].incorrect_answers,
  ];

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    if (!hiddenNextPlayer || !hiddenViewResult) {
      clearInterval(interval);
    }

    if (time === 0) {
      handleSubmit();
      if (indexQuestion === question.length - 1) {
        clearInterval(interval);
      }
    }
    return () => clearInterval(interval);
  }, [time]);

  const handleChangeInput = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(
      saveResults({
        player: listPlayers[indexPlayers],
        answer: answer,
        result: question[indexQuestion].correct_answer,
        // score: question[indexQuestion].correct_answer === answer ? 1 : 0,
        timeFinish: 10 - time,
      })
    );

    if (indexQuestion !== question.length - 1) {
      dispatch(nextQuestion());
      setTime(10);
    }
    if (indexQuestion === question.length - 1) {
      setHiddenNextPlayer(false);
    }
    if (
      indexPlayers === listPlayers.length - 1 &&
      indexQuestion === question.length - 1
    ) {
      setHiddenNextPlayer(true);
      setHiddenViewResult(false);
    }
    setAnswer("");
  };
  const handleNextPlayer = () => {
    dispatch(nextPlayer());
    setTime(10);
    setHiddenNextPlayer(true);
  };

  const handleViewResult = () => {
    page("/result");
  };

  return (
    <div>
      <div className="header-game-screen">
        <div> Player : {listPlayers[indexPlayers]}</div>
        <div>Time Remaining : {time}</div>
      </div>
      <div>{question[indexQuestion].question}</div>
      <RadioGroup
        aria-label="Your plan"
        name="people"
        defaultValue="Individual"
      >
        <List
          sx={{
            minWidth: 240,
            "--List-gap": "0.5rem",
            "--List-item-paddingY": "1rem",
            "--List-item-radius": "8px",
            "--List-decorator-size": "32px",
          }}
        >
          {listAnswers.map((item) => (
            <ListItem variant="outlined" key={item}>
              <Radio
                overlay
                onChange={handleChangeInput}
                value={item}
                label={item}
                sx={{ flexGrow: 1, flexDirection: "row-reverse" }}
                componentsProps={{
                  action: ({ checked }) => ({
                    sx: (theme) => ({
                      ...(checked && {
                        inset: -1,
                        border: "2px solid",
                        borderColor: theme.vars.palette.primary[500],
                      }),
                    }),
                  }),
                }}
              />
            </ListItem>
          ))}
        </List>
      </RadioGroup>
      <div className="btn-submit-game">
        <Stack spacing={2} direction="row">
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!answer || !hiddenNextPlayer || !hiddenViewResult}
          >
            Submit
          </Button>
        </Stack>
      </div>
      <div className="btn-submit-game">
        <Stack spacing={2} direction="row">
          <Button
            className={hiddenNextPlayer && "hiddenNextPlayer"}
            onClick={handleNextPlayer}
            variant="contained"
          >
            Next Player
          </Button>
        </Stack>
      </div>
      <div className="btn-submit-game">
        <Stack spacing={2} direction="row">
          <Button
            className={hiddenViewResult && "hiddenViewResult"}
            onClick={handleViewResult}
            variant="contained"
          >
            View Result
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default GameScreen;
