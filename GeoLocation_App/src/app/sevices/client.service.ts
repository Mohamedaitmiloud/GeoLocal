import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clients } from '../Model/Clients';
//import { ClientsInterface } from '../Model/Clients.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
 

  constructor(private http:HttpClient ) {}

  //ajouter le nouveau client a la base de données
  registerClient(client:Clients){
    const headers = new HttpHeaders().set('Content-Type','application/json');
    /*const newClient={
      username:client.username,
      email:client.email,
      password:client.password
    }*/
    console.log(client)
    //const c=JSON.stringify(client)
    return this.http.post<Clients> (`${environment.apiUrl}registration`, client,{observe:'response'})
  }

  getClients(){
    return this.http.get<Clients[]>(`${environment.apiUrl}registration`)
  }
  
}
