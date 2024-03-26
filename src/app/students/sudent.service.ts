import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
import {UpdateStudentRequest} from '../models/api-models/UpdateStudentRequest.model'
import {AddStudentRequest} from '../models/api-models/addStudentRequest.model'


@Injectable({
  providedIn: 'root'
})
export class SudentService {

  private baseurl = 'https://localhost:7144';

  constructor(private httpClient:HttpClient) { }

  getStudents():Observable<Student[]>{
   return this.httpClient.get<Student[]>(this.baseurl + '/student'); 
  }
  getStudent(studentID:string):Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.baseurl + '/student/' + studentID); 
   }

   updateStudent(studentID:string,studentRequest:Student):Observable<Student>{
    const updateStudentRequest:UpdateStudentRequest ={
      firstName:studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateofBirth: studentRequest.dateOfBirth,
      email:studentRequest.email,
      mobile:studentRequest.mobile,
      genderId:studentRequest.genderId,
      physicalAddress:studentRequest.address.physicalAddress,
      postalAddress:studentRequest.address.postalAddress
    }
   return  this.httpClient.put<Student>(this.baseurl + '/student/' + studentID,updateStudentRequest);
   }
   deleteStudent(studentId: string): Observable<Student> {
    return this.httpClient.delete<Student>(this.baseurl + '/student/' + studentId);
  }
  addStudent(studentRequest:Student): Observable<Student>{
    const addStudentRequest: AddStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress
    };
    return this.httpClient.post<Student>(this.baseurl + '/Student/Add', addStudentRequest);
  
}
}
