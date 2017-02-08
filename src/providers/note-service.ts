import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Note } from '../entities/note';

@Injectable()
export class NoteService {
  SERVER_NAME = 'https://ionic-service-a-santamaria.c9users.io:8080';
  // SERVER_NAME = 'api';

  constructor(public http: Http) {
    console.log('Hello NoteService Provider');
  }

  addNote(note: Note, username: string) {
    let postNotesUrl = `${this.SERVER_NAME}/addNote`;

    let body = JSON.stringify({
      title: note.title,
      content: note.content,
      photo: note.photo,
      user_name: username
    });
    let headers = new Headers({ 'Accept': 'application/json', 
                                'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(postNotesUrl, body, options)
                    .map( (data) => data.json() );
  }

  getNotes(username: string) {
    let getNotesUrl = `${this.SERVER_NAME}/listNotes?user_name=${username}`;

    return this.http.get(getNotesUrl)
                    .map( (data) => data.json() );
  }
}
