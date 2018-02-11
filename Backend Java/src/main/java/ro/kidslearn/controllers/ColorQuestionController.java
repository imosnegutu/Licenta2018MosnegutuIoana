package ro.kidslearn.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ro.kidslearn.entities.ColorQuestion;
import ro.kidslearn.utils.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class ColorQuestionController {

    public static Logger logger = LoggerFactory.getLogger(ColorQuestionController.class);

    public static Connection conn = (Connection) DBConnection.getConnection();

    public static ArrayList<ColorQuestion> getQuestions() {
        ArrayList<ColorQuestion> questions = new ArrayList<ColorQuestion>();

        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT * FROM color_questions");
            rs = stmt.executeQuery();

            while (rs.next()) {
                ColorQuestion aq = new ColorQuestion();
                aq.setId(rs.getInt(1));
                aq.setCssColor(rs.getString(2));
                aq.setCorrectAnswer(rs.getString(3));
                aq.setAnswer1(rs.getString(4));
                aq.setAnswer2(rs.getString(5));
                aq.setAnswer3(rs.getString(6));
                questions.add(aq);
            }

        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return questions;
    }
}
