package ro.kidslearn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.kidslearn.controllers.UserController;
import ro.kidslearn.entities.User;
import ro.kidslearn.mechanic.AlphabetGameHelper;
import ro.kidslearn.mechanic.ColorGameHelper;


@SpringBootApplication
@RestController
@CrossOrigin
public class BackendApplication {
    public static boolean jobStarted = false;

    public static void main(String[] args) {
        //Create instance of factory

        SpringApplication.run(BackendApplication.class, args);


    }


    @RequestMapping("/")
    public String home() {


        return "Kids game backend is running!";


    }


    @RequestMapping("/_ah/health")
    public String healthy() {
        // Message body required though ignored
        return "Still surviving.";
    }


    @RequestMapping(value = "/users/v1/login", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity loginUser(@RequestParam(value = "email", required = true) String email,
                                    @RequestParam(value = "password", required = true) String password
    ) {


        User u = UserController.loginUser(email, password);
        try {
            if (u != null) {

                return ResponseEntity.status(HttpStatus.OK).body(u);

            } else
                return ResponseEntity.status(HttpStatus.OK).body(new User());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.OK).body(new User());
        }

    }


    @RequestMapping(value = "/users/v1/register", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity registerUser(@RequestParam(value = "email", required = true) String email,
                                       @RequestParam(value = "password", required = true) String password
    ) {


        UserController.registerUser(email, password);

        return ResponseEntity.status(HttpStatus.OK).body("OK");


    }

    @RequestMapping(value = "/alphabet/v1/get-suite", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity getAlphabetQuestionSutie(
    ) {


        return ResponseEntity.status(HttpStatus.OK).body(AlphabetGameHelper.getQuestionSuite());


    }

    @RequestMapping(value = "/alphabet/v1/answer", method = RequestMethod.POST, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity answerAlphabet(
    ) {


        return ResponseEntity.status(HttpStatus.OK).body(AlphabetGameHelper.getQuestionSuite());


    }

    @RequestMapping(value = "/colors/v1/get-suite", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity getColorQuestionSuite(
    ) {


        return ResponseEntity.status(HttpStatus.OK).body(ColorGameHelper.getQuestionSuite());


    }
}