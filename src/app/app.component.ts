import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { NotasPage } from '../pages/notas/notas'; 

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(platform: Platform) {

    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'About', component: AboutPage, icon: 'help' },
      { title: 'Contact', component: ContactPage, icon: 'contacts' },
      { title: 'Notas', component: NotasPage, icon: 'done-all' },
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  openContact() {
    this.nav.setRoot(ContactPage);
  }
}
