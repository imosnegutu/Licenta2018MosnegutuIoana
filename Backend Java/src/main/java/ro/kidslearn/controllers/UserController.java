package ro.kidslearn.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ro.kidslearn.entities.User;
import ro.kidslearn.utils.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserController {

    public static Logger logger = LoggerFactory.getLogger(UserController.class);

    public static Connection conn = (Connection) DBConnection.getConnection();

    public static User loginUser(String email, String password) {

        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT * FROM users WHERE email=? AND password=?");
            stmt.setString(1, email);
            stmt.setString(2, password);

            rs = stmt.executeQuery();

            if (rs.next()) {
                User u = new User();
                u.setId(rs.getInt(1));
                u.setEmail(email);

                logger.info("Found user with id " + u.getId());
                return u;
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return null;
    }

    public static void registerUser(String email, String password) {
        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("INSERT INTO users(email,password) VALUES (?,?)");
            stmt.setString(1, email);
            stmt.setString(2, password);
            stmt.executeUpdate();

        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }
}
