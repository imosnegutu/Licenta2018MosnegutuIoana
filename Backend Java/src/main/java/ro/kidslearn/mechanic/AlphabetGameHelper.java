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

            String letter = genereateRandomLetter();
            while (questionSuite.get(i).getCorrectLetter().equals(letter)) {
                letter = genereateRandomLetter();
            }
            questionSuite.get(i).setOption1(letter);

            while (questionSuite.get(i).getCorrectLetter().equals(letter) || questionSuite.get(i).getOption1()
                .equals(letter)) {
                letter = genereateRandomLetter();
            }
            questionSuite.get(i).setOption2(letter);

            while (questionSuite.get(i).getCorrectLetter().equals(letter) || questionSuite.get(i).getOption1()
                .equals(letter) || questionSuite.get(i).getOption2().equals(letter)) {
                letter = genereateRandomLetter();
            }
            questionSuite.get(i).setOption3(letter);

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
