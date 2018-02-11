package ro.kidslearn.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ro.kidslearn.entities.AlphabetQuestion;
import ro.kidslearn.utils.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class AlphabetQuestionController {


    public static Logger logger = LoggerFactory.getLogger(AlphabetQuestionController.class);
    public static Connection conn = (Connection) DBConnection.getConnection();


    public static ArrayList<AlphabetQuestion> getQuestions() {
        ArrayList<AlphabetQuestion> questions = new ArrayList<AlphabetQuestion>();


        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT * FROM alphabet_questions");


            rs = stmt.executeQuery();

            while (rs.next()) {

                AlphabetQuestion aq = new AlphabetQuestion();
                aq.setId(rs.getInt(1));
                aq.setImage(rs.getString(2));
                aq.setCorrectLetter(rs.getString(3));
                questions.add(aq);


            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }
        return questions;


    }
}
