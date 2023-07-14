import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/Ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http:HttpClient) { }
  private baseUrl = 'http://localhost:8087/SpringPi/Ingredient';
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
  
  addIngredient(data: {}): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/addIngredient',data, this.httpOptionsAdd);
  }
  updateIngredient(data: {}): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/updateIngredient', data, this.httpOptionsAdd);
  }
  getIngredients(): Observable<Ingredient[]>{
    return this.http.get<Ingredient[]>(`${this.baseUrl}/getAll`,this.httpOptions);
  }
  deleteIngredient(id_ingredient: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id_ingredient}`);
  }
}
