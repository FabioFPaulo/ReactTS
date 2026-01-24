import useQuizQuestions from "@/hooks/quiz/useQuizQuestions";
import type Answer from "@/repositories/quiz/models/Answer";
import {
    Button,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    Typography,
} from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";

function GameScreen() {
    const [correctAns, setCorrectAns] = useState<number>(0);
    const [wrongAns, setWrongAns] = useState<number>(0);

    const [questionIndex, setQuestionIndex] = useState<number>(0);

    const [quiz, fetchQuiz] = useQuizQuestions();

    const checkGame = useCallback(
        (answer: Answer) => {
            if (answer.isCorrect) {
                setCorrectAns((e) => e + 1);
            } else {
                setWrongAns((e) => e + 1);
            }

            if (questionIndex + 1 < quiz.data.length) {
                setQuestionIndex((e) => e + 1);
            }
        },
        [questionIndex, quiz.data.length]
    );

    useEffect(() => {
        fetchQuiz();
    }, [fetchQuiz]);

    return (
        <Card sx={{ width: "100%" }}>
            {quiz.loading && <LinearProgress />}
            <CardContent>
                <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                >
                    Question {questionIndex + 1}-{quiz.data.length}
                </Typography>
                {quiz.data.length > 0 && (
                    <>
                        <Typography variant="h5" component="div">
                            {quiz.data[questionIndex].question}
                        </Typography>

                        <Grid container rowSpacing={3} pt={5}>
                            {Object.keys(quiz.data[questionIndex].answers).map(
                                (answerKey, index) =>
                                    quiz.data[questionIndex].answers[
                                        answerKey
                                    ] === null ? (
                                        <Fragment key={index}></Fragment>
                                    ) : (
                                        <Grid size={12}>
                                            <Button
                                                key={index}
                                                fullWidth
                                                variant="contained"
                                                onClick={() =>
                                                    checkGame(
                                                        quiz.data[questionIndex]
                                                            .answers[answerKey]!
                                                    )
                                                }
                                            >
                                                {
                                                    quiz.data[questionIndex]
                                                        .answers[answerKey]
                                                        .label
                                                }
                                            </Button>
                                        </Grid>
                                    )
                            )}
                        </Grid>
                    </>
                )}
            </CardContent>
        </Card>
    );
}

export default GameScreen;
