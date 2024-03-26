import { Component, OnInit } from '@angular/core';
import { SudentService } from '../students/sudent.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/Ui-Model/student.model';
import { GenderService } from '../Services/gender.service';
import { Gender } from '../models/Ui-Model/gender.model';
import { error } from 'console';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent implements OnInit {

  studentID:string|null|undefined; 

   student : any =
    {
        id: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        mobile: 0,
        profileImageUrl: '',
        genderId: '',
        gender: {
            id: '',
            description: ''
        },
        address: {
            id: '',
            physicalAddress: '',
            postalAddress: ''
        }
    }

    isNewStudent =false;
    header ='';
    displayProfileImageUrl = '';
    genderList: Gender[]= [];

  constructor(private readonly studentService:SudentService,
     private readonly route:ActivatedRoute,private readonly Genderservice:GenderService,
     private datePipe: DatePipe,private snackbar:MatSnackBar,private router:Router){

     }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params)=>{
        this.studentID=params.get('id')

        if(this.studentID){
          if(this.studentID.toLowerCase()==='Add'.toLowerCase()){
            this.isNewStudent =true;
            this.header ='Add New Student'
            this.setImage();  
          }else{
            this.isNewStudent =false;
            this.header ='Edit Student'

            this.studentService.getStudent(this.studentID).subscribe(
              (successResponse)=>{
                this.student = successResponse;       
                this.setImage();     
              },
              (errorResponse) => {
                this.setImage();
              }
            );

          }
        }           
        this.Genderservice.getGenderList()
        .subscribe(
          (successResponse)=>{
            this.genderList =successResponse;
          }
        )
       
      }
    );
   
  }
  onUpdate():void{
   // this.student.dateofBirth = this.datePipe.transform(this.student.dateofBirth, 'yyyy-MM-dd');

    this.studentService.updateStudent(this.student.id,this.student)
    .subscribe(
      (successResponse)=>{
         // Show a notification
         this.snackbar.open('Student updated successfully', undefined, {
          duration: 2000
        });
      },
      (error)=>{
      console.log(error)
      }
    )
  }
  onDelete(){
    this.studentService.deleteStudent(this.student.id)
    .subscribe(
      (successResponse)=>{
        this.snackbar.open('Student deleted successfully', undefined, {
          duration: 2000
        });
        setTimeout(() => {
          this.router.navigateByUrl('students');
        }, 2000);
      
      },
      (errorResponse) => {
        // Log
      }
    )
  }
  OnAdd():void{
    this.studentService.addStudent(this.student)
    .subscribe(
      (successResponse)=>{
        this.snackbar.open('Student Added successfully', undefined, {
          duration: 2000
        });
        setTimeout(() => {
          this.router.navigateByUrl('students');
        }, 2000);
      
      },
      (errorResponse) => {
       console.log(errorResponse)
      }
    )
  }
  uploadImage(event: any): void {
    if (this.studentID) {
      const file: File = event.target.files[0];
      this.studentService.uploadImage(this.student.id, file)
        .subscribe(
          (successResponse) => {
            this.student.profileImageUrl = successResponse;
            this.setImage();

            // Show a notification
            this.snackbar.open('Profile Image Updated', undefined, {
              duration: 2000
            });

          },
          (errorResponse) => {

          }
        );

    }

  }
  private setImage(): void {
    if (this.student.profileImageUrl) {
      this.displayProfileImageUrl = this.studentService.getImagePath(this.student.profileImageUrl);
    } else {
      // Display a default
      this.displayProfileImageUrl = 'assets/users.jpg';
    }
  }
}
