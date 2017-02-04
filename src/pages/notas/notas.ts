import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Note } from '../../entities/note';
import { Camera } from 'ionic-native';

@Component({
  selector: 'page-notas',
  templateUrl: 'notas.html'
})
export class NotasPage {

  notes: Note[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController) 
  {
    this.notes = [];
  }

  addNote() {
    let prompt = this.alertCtrl.create({
      title: 'Nota',
      message: "Nueva nota",
      inputs: [
        {
          name: 'title',
          placeholder: 'Titulo'
        },
        {
          name: 'content',
          placeholder: 'Contanido'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data);
            let nuevaNota = new Note();
            nuevaNota.title = data.title;
            nuevaNota.content = data.content;
            this.notes.push(nuevaNota);
          }
        }
      ]
    });
    prompt.present();
  }

  editNote(note) {
  }

  deleteNote(note) {
      let index = this.notes.indexOf(note);
      if(index > -1){
          this.notes.splice(index, 1);
      }
  }

  addPhoto(note) {
    let options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      targetWidth: 1000,
      targetHeight: 1000,
      correctOrientation: true,
      allowEdit: true
    };

    Camera.getPicture(options).then(
      (imageData) => {
        let uri =  imageData;
        note.photoUri = uri;
      }, 
      (err) => {
        console.log(err);
      });
  }
}
