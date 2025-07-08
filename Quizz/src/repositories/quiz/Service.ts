import Question from "@/repositories/quiz/models/Question";
import axios, { type AxiosResponse } from "axios";

class QuizService {
    private _axios;

    constructor(baseUrl: string, apiKey: string) {
        this._axios = axios.create({
            baseURL: baseUrl,
            headers: {
                "X-Api-Key": apiKey,
            },
        });
    }

    async getQuestions(limit: number = 10) {
        const response = await this._axios.get("/questions?limit=" + limit);
        const questions = response.data.map((element: AxiosResponse["data"]) =>
            Question.fromResponse(element)
        );
        return questions;
    }
}

export default QuizService;
