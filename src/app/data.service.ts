import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private myRoute: Router, private firestore: AngularFirestore) { }
 
  getEmployees() {
    return this.firestore.collection('employees').snapshotChanges();
  }
 

  sendToken(token: string) {
    localStorage.setItem('LoggedInUser', token);
  }
  getToken() {
    return localStorage.getItem('LoggedInUser');
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem('LoggedInUser');
    this.myRoute.navigate(['login']);
  }
  login() {
    localStorage.removeItem('LoggedInUser');
    this.myRoute.navigate(['login']);
  }
}
