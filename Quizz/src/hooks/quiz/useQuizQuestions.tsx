import type { QuizState } from "@/hooks/quiz/types";
import QuizService from "@/repositories/quiz/Service";
import { useCallback, useState } from "react";

const service = new QuizService(
    "https://quizapi.io/api/v1",
    import.meta.env.VITE_QUIZ_KEY
);

function useQuizQuestions() {
    const [quiz, setQuiz] = useState<QuizState>({
        loading: false,
        data: [],
    });

    const fetchData = useCallback(async () => {
        setQuiz((e) => ({ ...e, loading: true }));
        try {
            const questions = await service.getQuestions();
            console.log(questions);
            setQuiz({ data: questions, loading: false });
        } catch {
            setQuiz((e) => ({ ...e, loading: false }));
        }
    }, []);

    return [quiz, fetchData] as [QuizState, typeof fetchData];
}

export default useQuizQuestions;
