import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { SudentService } from './sudent.service';
import { Student } from '../models/Ui-Model/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
  
})
export class StudentsComponent implements OnInit{

  constructor(private sudentServices:SudentService){}

  students:Student[] =[];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'Email','Mobile','gender'];
  datasource:MatTableDataSource<Student> =new MatTableDataSource<Student>();

  @ViewChild(MatPaginator) matPaginator! :MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  filterstring ='';
  ngOnInit(): void {
    this.sudentServices.getStudent().subscribe(
      (success)=>{
      this.students =success;
      this.datasource = new  MatTableDataSource<Student>(this.students);
      this.datasource.paginator = this.matPaginator;
      this.datasource.sort = this.sort;
      },
      (error)=>{console.log(error)}
    );
  }
  FilterStudents(){
    this.datasource.filter =this.filterstring.trim().toLowerCase();
  }
}
