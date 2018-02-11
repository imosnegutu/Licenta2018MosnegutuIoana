package ro.kidslearn.entities;

public class AlphabetQuestion {
    private int id;

    private String image;

    private String correctLetter;

    private String option1;

    private String option2;

    private String option3;

    public String getOption1() {
        return option1;
    }

    public void setOption1(String option1) {
        this.option1 = option1;
    }

    public String getOption2() {
        return option2;
    }

    public void setOption2(String option2) {
        this.option2 = option2;
    }

    public String getOption3() {
        return option3;
    }

    public void setOption3(String option3) {
        this.option3 = option3;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCorrectLetter() {
        return correctLetter;
    }

    public void setCorrectLetter(String correctLetter) {
        this.correctLetter = correctLetter;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
