import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { RadarPage } from '../radar/radar';
import { MatematicaPage } from '../matematica/matematica';
import { ColorsPage } from '../culori/culori';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  public tab2Root;
    public tab4Root;
  public tab3Root;
  public emailParam: any;

  constructor(public navCtrl: NavController, public params: NavParams) {
    this.emailParam = params.get("user");
    console.log("Primit in tabs: ");
    console.log(this.emailParam);

this.tab4Root = MatematicaPage;
    this.tab2Root = RadarPage;
    this.tab3Root = ColorsPage;
  }




}
