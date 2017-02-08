import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { Note } from '../../entities/note';
import { Camera } from 'ionic-native';

import { NoteService } from '../../providers/note-service';

@Component({
  selector: 'page-notas',
  templateUrl: 'notas.html'
})
export class NotasPage implements OnInit {

  notes: Note[];
  username: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public noteService: NoteService,
              public loadingCtrl: LoadingController) 
  {
    this.notes = [];
    this.username = 'a-santamaria';
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading Please Wait...'
    });
    loading.present();
    this.noteService.getNotes(this.username).subscribe(
      (data) => {
        console.log(data);
        for(let rawNote of data) {
           let nuevaNota = new Note();
           nuevaNota.title = rawNote.TITLE;
           nuevaNota.content = rawNote.CONTENT;
           nuevaNota.photo = rawNote.PHOTO;

           this.notes.push(nuevaNota);
        }
        loading.dismiss();
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      }
    );
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
            let loading = this.loadingCtrl.create({
              spinner: 'dots',
              content: 'Loading Please Wait...'
            });
            loading.present();

            console.log(data);
            let nuevaNota = new Note();
            nuevaNota.title = data.title;
            nuevaNota.content = data.content;

            this.noteService.addNote(nuevaNota, 'a-santamaria')
              .subscribe(
                (data) => {
                  // nuevaNota.id = data.id;
                  loading.dismiss();
                },
                (error) => {
                  console.log(error);
                  loading.dismiss();
                }
              )

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
      correctOrientation: true,
      allowEdit: true
    };

    Camera.getPicture(options).then(
      (imageData) => {
        let uri =  imageData;
        note.photo = uri;
      }, 
      (err) => {
        console.log(err);
      });
  }
}
