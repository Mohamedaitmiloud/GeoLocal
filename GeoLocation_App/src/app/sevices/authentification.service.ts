import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clients } from '../Model/Clients';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  apiUrl="http://localhost:3000/clients";
 
  
  
  constructor(private http: HttpClient) {
  }
    
  login(client ) {
      //const clientLogin= { username:null, email:email,password:password}
      return this.http.post<Clients>('http://localhost:3000/registration', client)
          // this is just the HTTP call, 
          // we still need to handle the reception of the token
         // .shareReplay();
  }
  /*
  getClient(){
    return this.http.get(this.apiUrl)
  }
  getToken() {
    return localStorage.getItem('access_token');
  }*/
  
/*
  isLoggedIn(){

    let token = localStorage.getItem("myToken");

    if (token) {
      return true ;
    } else {
      return false;
    }
  }*/
}
