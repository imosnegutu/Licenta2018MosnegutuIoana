import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';

import { Http, Headers, RequestOptions } from '@angular/http';

import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  public user = {
    email: "dada",
    password: "dada",


  }

  constructor(public navCtrl: NavController, private alertController: AlertController, public http: Http) {

  }

 showAlert() {
    let alert = this.alertController.create({
      title: 'Felicitari!',
      subTitle: 'Te-ai inregistrat cu succes!',
      buttons: ['OK']
    });
    alert.present();
  }

  finishRegistration() {
  
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    var data = 'email=' + this.user.email + '&password=' + this.user.password;

    this.http.post("http://localhost:3131/users/v1/register", data, options)
      .subscribe(data => {
      
        
           this.showAlert();
      }, error => {
        console.log(error);// Error getting the data
      });
  
    this.navCtrl.push(LoginPage, { user: this.user });

  }




}
