package ro.kidslearn.mechanic;

import ro.kidslearn.controllers.AlphabetQuestionController;
import ro.kidslearn.entities.AlphabetQuestion;

import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

public class AlphabetGameHelper {

    public static ArrayList<AlphabetQuestion> getQuestionSuite() {

        ArrayList<AlphabetQuestion> questions = AlphabetQuestionController.getQuestions();

        ArrayList<AlphabetQuestion> questionSuite = new ArrayList<AlphabetQuestion>();
        int randomNum;
        for (int i = 0; i < 5; i++) {

            randomNum = ThreadLocalRandom.current().nextInt(0, questions.size());

            questionSuite.add(questions.get(randomNum));


            questionSuite.get(i).setOption1(genereateRandomLetter());
            questionSuite.get(i).setOption2(genereateRandomLetter());
            questionSuite.get(i).setOption3(genereateRandomLetter());
            questions.remove(randomNum);
        }

        return questionSuite;
    }

    private static String genereateRandomLetter() {

        Random r = new Random();
        char c = (char) (r.nextInt(26) + 'a');
        return c + "";
    }
}
