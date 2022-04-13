import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/app'
import "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentToken : string | any;

  constructor(private router:Router) { }


  RegisterUser(email: string, password: string) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res)

      })
      .catch(error => {
        console.log(error)
      })
  }

  LoginUser(email: string, password: string) {

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        this.gettoken()
      this.router.navigate(['/table'])

      })
      .catch(error => {
        console.log(error)
      })
  }

  gettoken() {
    firebase.auth().currentUser?.getIdToken()
      .then((token: string) => {
        this.currentToken = token
      });
    return this.currentToken;
 }

 isAuthenticated(){
   return this.currentToken != null? true : false;
 }

 logout(){
  this.router.navigate(['/login']);
  firebase.auth().signOut();
  this.currentToken = null;
 }



}