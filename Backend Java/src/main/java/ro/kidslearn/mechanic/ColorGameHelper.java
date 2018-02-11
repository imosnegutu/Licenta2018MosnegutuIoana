package ro.kidslearn.mechanic;

import ro.kidslearn.controllers.ColorQuestionController;
import ro.kidslearn.entities.ColorQuestion;

import java.util.ArrayList;
import java.util.concurrent.ThreadLocalRandom;

public class ColorGameHelper {
    public static ArrayList<ColorQuestion> getQuestionSuite() {

        ArrayList<ColorQuestion> questions = ColorQuestionController.getQuestions();

        ArrayList<ColorQuestion> questionSuite = new ArrayList<ColorQuestion>();
        int randomNum;
        for (int i = 0; i < 5; i++) {

            randomNum = ThreadLocalRandom.current().nextInt(0, questions.size());

            questionSuite.add(questions.get(randomNum));


            questions.remove(randomNum);
        }

        return questionSuite;
    }


}
