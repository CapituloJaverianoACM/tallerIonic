import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NotasPage } from '../notas/notas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToNotes() {
    this.navCtrl.push(NotasPage);
  }
}
