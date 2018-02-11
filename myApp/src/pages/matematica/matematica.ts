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
    selector: 'page-matematica',
    templateUrl: 'matematica.html'
})


export class MatematicaPage {
    public operation;

    public questionNumberFront = "Intrebarea 1/5";
    public questionNumber = 1;
    public correctAnswer;
    public score = 0;
    public randomNumber1;
    public randomNumber2;

    constructor(public navCtrl: NavController, public params: NavParams, private geolocation: Geolocation, public http: Http, private elRef: ElementRef, private alertController: AlertController) {




    }
    ionViewDidLoad() {
        this.loadQuestionMatematica();
        document.getElementById('next-button').style.display = 'none';
    }




    loadQuestionMatematica() {



        this.randomNumber1 = Math.floor(Math.random() * 99 + 1);
        this.randomNumber2 = Math.floor(Math.random() * 99 + 1);
        var operationSignNumber = Math.floor(Math.random() * 5 + 1);
        var answers = [];
        answers[0] = Math.floor(Math.random() * 200 + 1);
        answers[1] = Math.floor(Math.random() * 50 + 1);
        answers[2] = Math.floor(Math.random() * 88 + 1);
        console.log("penultimul " + answers[1] + " ultimul " + answers[2] + " si primul " + answers[0]);


        if (operationSignNumber % 2 == 0) {
            this.operation = '+';
            answers[3] = this.randomNumber1 + this.randomNumber2;
            this.correctAnswer = answers[3];
        } else {
            this.operation = '-';
            answers[3] = this.randomNumber1 - this.randomNumber2;
            this.correctAnswer = answers[3];
        }

        document.getElementById("operation-sign").innerHTML = this.operation;
        document.getElementById("first-number").innerHTML = this.randomNumber1;
        document.getElementById("second-number").innerHTML = this.randomNumber2;


        for (var i = 1; i < 4; i++) {
            var pos = Math.floor(Math.random() * answers.length - 1 + 1);
            console.log(pos);
            document.getElementById('answerMatematica-' + i).innerHTML = answers[pos];
            answers.splice(pos, 1);


        }
        document.getElementById('answerMatematica-' + i).innerHTML = answers[0];



    }

    answerQuestionMatematica(response: any) {
        if (document.getElementById("answerMatematica-" + response).innerHTML == this.correctAnswer) {
            document.getElementById("answerMatematica-" + response).style.backgroundColor = 'green';
            this.score++;


        } else {
            for (var i = 1; i < 5; i++) {
                if (document.getElementById('answerMatematica-' + i).innerHTML == this.correctAnswer)
                    document.getElementById('answerMatematica-' + i).style.backgroundColor = 'green';
            }

            document.getElementById('answerMatematica-' + response).style.backgroundColor = "red";
        }
        document.getElementById("next-button").style.display = "";

    }
    
     nextQuestionMatematica() {
        if (this.questionNumber < 5) {
            for (var i = 1; i < 5; i++) {
                document.getElementById('answerMatematica-' + i).style.backgroundColor = "transparent";
            }
            this.questionNumber++;
            this.questionNumberFront = "Intrebarea " + this.questionNumber + "/5";
            this.loadQuestionMatematica();
            document.getElementById("next-button").style.display = "none";
        } else {
            this.showAlert();
            this.loadQuestionMatematica();
            document.getElementById('next-button').style.display = 'none';
            this.score = 0;
            this.questionNumber = 1;
            for (var i = 1; i < 5; i++) {
                document.getElementById('answerMatematica-' + i).style.backgroundColor = "transparent";
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