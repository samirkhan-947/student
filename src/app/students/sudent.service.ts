import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class SudentService {

  private baseurl = 'https://localhost:7144';

  constructor(private httpClient:HttpClient) { }

  getStudent():Observable<Student[]>{
   return this.httpClient.get<Student[]>(this.baseurl + '/student'); 
  }
}
