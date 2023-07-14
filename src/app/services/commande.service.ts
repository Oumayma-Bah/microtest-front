import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { id } from '@swimlane/ngx-datatable';
import { Commande } from "../models/Commande"
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  constructor(private http:HttpClient) { }
  private baseUrl = 'http://localhost:8087/SpringPi/commande';
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json'
    })
  }
  addCommande(commande: Commande): Observable<Commande> {
      return this.http.post<Commande>(`${this.baseUrl}/add`, commande);
  }
  getCommandes(): Observable<Commande[]>{
    return this.http.get<Commande[]>(`${this.baseUrl}/get`,this.httpOptions);
  }
}

