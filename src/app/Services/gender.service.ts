import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gender } from '../models/api-models/gender.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseurl = 'https://localhost:7144';
  constructor(private httpClient:HttpClient) { }

  getGenderList():Observable<Gender[]>{
   return this.httpClient.get<Gender[]>(this.baseurl + '/genders');
  }
}
