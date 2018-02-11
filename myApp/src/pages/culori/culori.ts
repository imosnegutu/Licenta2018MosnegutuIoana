import {
    Component,
    ElementRef,
    AfterContentInit
} from '@angular/core';
import {
    Geolocation
} from '@ionic-native/geolocation';
import {
    NavController,
    NavParams
} from 'ionic-angular';
import {
    Http,
    Headers,
    RequestOptions
} from '@angular/http';
import {
    MissionsPage
} from '../missions/missions';
import {
    AlertController
} from 'ionic-angular';
import {
    TabsPage
} from '../tabs/tabs';

import * as $ from 'jquery'

@Component({
    selector: 'page-culori',
    templateUrl: 'culori.html'
})


export class ColorsPage {


    public questionNumberFront = "Intrebarea 1/5";
    public questionNumber = 1;
    public score = 0;

    public colorQuestions: any;
    constructor(public navCtrl: NavController, public params: NavParams, private geolocation: Geolocation, public http: Http, private elRef: ElementRef, private alertController: AlertController) {




    }
    ionViewDidLoad() {
        this.getQuestionsColor();
        document.getElementById('next-button').style.display = 'none';
    }



    getQuestionsColor() {
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({
            headers: headers
        });

        var data = '';

        this.http.get("http://localhost:3131/colors/v1/get-suite", options)
            .subscribe(data => {
                this.colorQuestions = data['_body'];
                this.colorQuestions = JSON.parse(this.colorQuestions);
                console.log(this.colorQuestions);

                this.loadQuestionColor();
                this.questionNumberFront = "Intrebarea 1/5";




            }, error => {
                console.log(error); // Error getting the data
            });

    }




    loadQuestionColor() {
        document.getElementById('culori-image').style.backgroundColor = this.colorQuestions[this.questionNumber - 1].cssColor;



        var answersList = [];
        answersList[0] = this.colorQuestions[this.questionNumber - 1].answer1;
        answersList[1] = this.colorQuestions[this.questionNumber - 1].answer2;
        answersList[2] = this.colorQuestions[this.questionNumber - 1].answer3;
        answersList[3] = this.colorQuestions[this.questionNumber - 1].correctAnswer;

        var randomNumber = Math.floor(Math.random() * 3 + 1);

        document.getElementById('answerColor-1').innerHTML = answersList[randomNumber];

        answersList.splice(randomNumber, 1);

        randomNumber = Math.floor(Math.random() * 2 + 1);

        document.getElementById('answerColor-2').innerHTML = answersList[randomNumber];

        answersList.splice(randomNumber, 1);

        randomNumber = Math.floor(Math.random() * 1 + 1);

        document.getElementById('answerColor-3').innerHTML = answersList[randomNumber];
        answersList.splice(randomNumber, 1);


        document.getElementById('answerColor-4').innerHTML = answersList[0];

    }

    answerQuestionColor(response: any) {
        if (document.getElementById("answerColor-" + response).innerHTML == this.colorQuestions[this.questionNumber - 1].correctAnswer) {
            document.getElementById("answerColor-" + response).style.backgroundColor = 'green';
            this.score++;


        } else {
            for (var i = 1; i < 5; i++) {
                if (document.getElementById('answerColor-' + i).innerHTML == this.colorQuestions[this.questionNumber - 1].correctAnswer)
                    document.getElementById('answerColor-' + i).style.backgroundColor = 'green';
            }

            document.getElementById('answerColor-' + response).style.backgroundColor = "red";
        }
        document.getElementById("next-button").style.display = "";

    }
    nextQuestionColor() {
        if (this.questionNumber < 5) {
            for (var i = 1; i < 5; i++) {
                document.getElementById('answerColor-' + i).style.backgroundColor = "transparent";
            }
            this.questionNumber++;
            this.questionNumberFront = "Intrebarea " + this.questionNumber + "/5";
            this.loadQuestionColor();
            document.getElementById("next-button").style.display = "none";
        } else {
            this.showAlert();
            this.getQuestionsColor();
            document.getElementById('next-button').style.display = 'none';
            this.score = 0;
            this.questionNumber = 1;
            for (var i = 1; i < 5; i++) {
                document.getElementById('answerColor-' + i).style.backgroundColor = "transparent";
            }



        }

    }


    showAlert() {
        let alert = this.alertController.create({
            title: 'Felicitari!',
            subTitle: 'Ai raspuns corect la ' + this.score + ' intrebari!',
            buttons: ['Super!']
        });
        alert.present();
    }

}