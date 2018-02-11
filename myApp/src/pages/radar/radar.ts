import { Component, ElementRef, AfterContentInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MissionsPage } from '../missions/missions';
import { AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

import * as $ from 'jquery'

@Component({
  selector: 'page-radar',
  templateUrl: 'radar.html'
})


export class RadarPage {


 public questionNumberFront = "Intrebarea 1/5";
 public questionNumber = 1;
 public score = 0;

  public alphabetQuestions: any;
  constructor(public navCtrl: NavController, public params: NavParams, private geolocation: Geolocation, public http: Http, private elRef: ElementRef, private alertController: AlertController) {

   
      
      
  }
ionViewDidLoad() {
    this.getQuestions();
      document.getElementById('next-button').style.display = 'none';
  }



  getQuestions() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    var data = '';

    this.http.get("http://localhost:3131/alphabet/v1/get-suite", options)
      .subscribe(data => {
        this.alphabetQuestions = data['_body'];
        this.alphabetQuestions = JSON.parse(this.alphabetQuestions);
        console.log(this.alphabetQuestions);
       
     this.loadQuestion();
        this.questionNumberFront = "Intrebarea 1/5";
       
        

      
      }, error => {
        console.log(error);// Error getting the data
      });

  }

    
        
   
  
loadQuestion(){
      document.getElementById('question-image').style.backgroundImage='url("../../assets/img/'+ this.alphabetQuestions[this.questionNumber-1].image +'")';
        
        
        
        var answersList = [];
        answersList[0] = this.alphabetQuestions[this.questionNumber-1].option1;
          answersList[1] = this.alphabetQuestions[this.questionNumber-1].option2;
            answersList[2] = this.alphabetQuestions[this.questionNumber-1].option3;
              answersList[3] = this.alphabetQuestions[this.questionNumber-1].correctLetter;
        
      
        var randomNumber = Math.floor(Math.random() * 3 + 1);
        
        
        
        
         document.getElementById('answer-1').innerHTML = answersList[randomNumber];
        
         answersList.splice(randomNumber,1);
        
        
        
        
        
        
        randomNumber = Math.floor(Math.random() * 2 + 1);
        
        document.getElementById('answer-2').innerHTML = answersList[randomNumber];
        
         answersList.splice(randomNumber,1);
        
         randomNumber = Math.floor(Math.random() * 1 + 1);
       
        document.getElementById('answer-3').innerHTML = answersList[randomNumber];
       answersList.splice(randomNumber,1);
       
        
        document.getElementById('answer-4').innerHTML = answersList[0];
    
}

  answerQuestion(response:any){
    if(document.getElementById("answer-"+response).innerHTML == this.alphabetQuestions[this.questionNumber-1].correctLetter){
    document.getElementById("answer-"+response).style.backgroundColor='green';
        this.score++;
        
    
    }
    else{
     for(var i = 1; i<5; i++){
           if(document.getElementById('answer-'+i).innerHTML == this.alphabetQuestions[this.questionNumber-1].correctLetter)
                document.getElementById('answer-'+i).style.backgroundColor='green';
     }
    
     document.getElementById('answer-'+response).style.backgroundColor="red";
    }
       document.getElementById("next-button").style.display = "";
  
  }
    nextQuestion(){
        if(this.questionNumber<5){
        for(var i = 1; i<5; i++){
         document.getElementById('answer-'+i).style.backgroundColor="transparent";
     }
            this.questionNumber++;
            this.questionNumberFront = "Intrebarea " + this.questionNumber + "/5";
            this.loadQuestion();
            document.getElementById("next-button").style.display = "none";
        }
        else{
             this.showAlert();
             this.getQuestions();
            document.getElementById('next-button').style.display = 'none';
            this.score=0;
            this.questionNumber=1;
             for(var i = 1; i<5; i++){
         document.getElementById('answer-'+i).style.backgroundColor="transparent";
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
