import Answer from "@/repositories/quiz/models/Answer";
import { type AxiosResponse } from "axios";

class Question {
    id: number;
    question: string;
    answers: { [key: string]: Answer | null };
    multipleChoice: boolean;
    category: string;
    difficulty: string;

    constructor(
        id: number,
        question: string,
        answers: { [key: string]: Answer | null },
        multipleChoice: boolean,
        category: string,
        difficulty: string
    ) {
        this.id = id;
        this.question = question;
        this.answers = answers;
        this.multipleChoice = multipleChoice;
        this.category = category;
        this.difficulty = difficulty;
    }

    static fromResponse(response: AxiosResponse["data"]): Question {
        return new Question(
            response.id,
            response.question,
            {
                answer_a:
                    response.answers.answer_a === null
                        ? null
                        : new Answer(
                              response.answers.answer_a,
                              response.correct_answers.answer_a_correct ===
                                  "true"
                          ),
                answer_b:
                    response.answers.answer_b === null
                        ? null
                        : new Answer(
                              response.answers.answer_b,
                              response.correct_answers.answer_b_correct ===
                                  "true"
                          ),
                answer_c:
                    response.answers.answer_c === null
                        ? null
                        : new Answer(
                              response.answers.answer_c,
                              response.correct_answers.answer_c_correct ===
                                  "true"
                          ),
                answer_d:
                    response.answers.answer_d === null
                        ? null
                        : new Answer(
                              response.answers.answer_d,
                              response.correct_answers.answer_d_correct ===
                                  "true"
                          ),
                answer_e:
                    response.answers.answer_e === null
                        ? null
                        : new Answer(
                              response.answers.answer_e,
                              response.correct_answers.answer_e_correct ===
                                  "true"
                          ),
                answer_f:
                    response.answers.answer_f === null
                        ? null
                        : new Answer(
                              response.answers.answer_f,
                              response.correct_answers.answer_f_correct ===
                                  "true"
                          ),
            },
            response.multiple_correct_answers === "true",
            response.category,
            response.difficulty
        );
    }
}

export default Question;
