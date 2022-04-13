import { Component, OnInit } from '@angular/core';
import  firebase from 'firebase/app';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bookproject';

  constructor(public _auth:AuthService){}
  ngOnInit() {
      
    const firebaseConfig={
      apiKey : "AIzaSyBDh2l4StrmikMzR9fQLRrgWOh4LguRmVo"
    };
   
    firebase.initializeApp(firebaseConfig);
  }

  onLogout(){
    this._auth.logout();
  }
}
