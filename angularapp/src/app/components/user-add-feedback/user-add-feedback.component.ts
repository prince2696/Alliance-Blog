import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { USERID_KEY } from '../constant';
 
 
@Component({
  selector: 'app-user-add-feedback',
  templateUrl: './user-add-feedback.component.html',
  styleUrls: ['./user-add-feedback.component.css']
})
export class UserAddFeedbackComponent implements OnInit {
 
  newFeedback: Feedback = {
    FeedbackId: 0,
    UserId: 0,
    FeedbackText: '',
    Date: new Date()
  }
   
  form: NgForm;
  formSubmitted: boolean = false;
  displayStyle: string = 'none';
  errorMessage:string='';
 
  constructor(private feedbackService: FeedbackService, private router: Router,private authService:AuthService) { }
 
  ngOnInit(): void {
  }
 
  isFieldInvalid(fieldName: string) {
    const value = this.newFeedback[fieldName];
    if (typeof value === 'string') {
      return !value.trim();
    } else if (value instanceof Date) {
      return isNaN(value.getTime());
    } else {
      return value == null;
    }
  }
 
  isFormValid() {
    const arr = ['FeedbackText'];
 
    for (let i of arr) {
      if (this.isFieldInvalid(i)) {
        return false;
      }
    }
    return true;
  }
   
  showModal:boolean = false;
 
  openModal() {
    this.showModal = true;
  }
 
  closeModal() {
    this.showModal = false;
  }
 
  confirmSubmission() {
    this.showModal = false;
    this.sendFeedback(this.form);
  }
 
 
  sendFeedback(form: any) {
    this.form = form;
    if (this.isFormValid()) {
      this.errorMessage='';
      this.newFeedback.UserId=this.authService.getUserId();
        this.feedbackService.sendFeedback(this.newFeedback).subscribe((data) => {
          this.formSubmitted = true;
          this.router.navigate([`user/view/feedback/${Number(localStorage.getItem(USERID_KEY))}`])
        });
   }
   else{
     this.errorMessage="Field is required";
   }
}
}