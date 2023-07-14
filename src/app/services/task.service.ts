import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }
  private baseUrl = 'http://localhost:9090/task';
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
  addTask(data:{}):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/AddTask', data, this.httpOptionsAdd);
  }
  updateTask(data: {}): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/updateTask', data, this.httpOptionsAdd);
  }
  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.baseUrl}/getTask`,this.httpOptions);
  }
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`,this.httpOptions);
  }
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteTask/${id}`);
  }
}
