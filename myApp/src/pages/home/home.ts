import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email: any;
  item = {
    amount: 0,
    attackSpeed: 3,
    calling: '',
    chakraRegen: 0,
    currentDurability: 0,
    description: '',
    diamonds: '',
    durability: 0,
    extraChakra: 0,
    extraHealth: 0,
    fatigueRegen: 0,
    healthRegen: 0,
    icon: '',
    id: 0,
    level: 0,
    meleeDefense: 0,
    name: '',
    rarity: 0,
    slots: 0,
    spellDefense: 0,
    spirit: 0,
    strength: 0,
    type: 0,
    weight: 0

  };


  npc = {
    description: "",
    icon: "",
    id: 0,
    lat: 0.0,
    lng: 0.0,
    missions: []


  };

    mission = {
    classSpecific: "",
    description: "",
    id: 0,
    minLevel: 0,
    missionType: 0,
    npcGiver: 0,
    npcGiverObject: this.npc


  };


  userInfo = {
   email:''
  };

  itemOpen = false;
  itemPopover = this.item;

  loggedInUser: any;

  itemAttributes: string;
  inventoryItems: string;

  constructor(public navCtrl: NavController, public params: NavParams, private geolocation: Geolocation, public http: Http) {
    this.loggedInUser = this.params.data;
    this.userInfo.email = this.params.data.email;
   console.log("Primit in Home: ");
    console.log(this.loggedInUser);
    

  }

 




      


  ionViewDidLoad() {
    
   
    this.addSelectorHandler();
  }
  
  addSelectorHandler() {
    document.querySelector('#profile-page').addEventListener('click', (event) => {


      //clicked on helmet
      switch (event.target['id']) {
        case 'player-helmet':

         
          break;
        default:
       
      }





    });


  }


  s

  showInventory() {

    document.getElementById('inventoryPopover').style.visibility = '';

  }







}
