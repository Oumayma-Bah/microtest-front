import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recette } from '../models/Recette';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  constructor(private http:HttpClient) { }
  private baseUrl = 'http://localhost:8087/SpringPi/Recette';
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json'
    })
  }
  httpOptionsAdd = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  }
  addRecette(data: {}): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/addRecette', data, this.httpOptionsAdd);
  }
  updateRecette(data: {}): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/updateRecette', data, this.httpOptionsAdd);
  }
  getRecettes(): Observable<Recette[]>{
    return this.http.get<Recette[]>(`${this.baseUrl}/getAll`,this.httpOptions);
  }
  deleteRecette(id_recette: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id_recette}`);
  }
  getRecetteByNom(nom: String): Observable<Recette> {
    return this.http.get<Recette>(`${this.baseUrl}/${nom}`,this.httpOptions);
  }
}
