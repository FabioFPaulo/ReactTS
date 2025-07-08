import type Question from "@/repositories/quiz/models/Question";

export interface QuizState {
    data: Question[];
    loading: boolean;
}
