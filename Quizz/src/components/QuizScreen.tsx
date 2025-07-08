import type Question from "@/repositories/quiz/models/Question";
import { Card, CardContent, Typography } from "@mui/material";

interface Props {
    question: Question;
    questionIndex: number;
    totalQuestions: number;
}

function QuizScreen(props: Props) {
    return (
        <Card sx={{ width: "100%" }}>
            <CardContent>
                <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                >
                    Question {props.questionIndex + 1}-{props.totalQuestions}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default QuizScreen;
