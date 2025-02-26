import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ADMIN_KEY } from '../constant';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: NgForm;
  userAdminKey:string;
  adminKey:string=ADMIN_KEY;
  constructor(private service: AuthService, private router: Router) { }
 
  ngOnInit(): void {
  }
 
  userModel: User = {
    UserId: 0,
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: ''
  }
  errorMessage: string = '';
  confirmPassword: string='';
  formSubmitted: boolean = false;
 
  isFieldInvalid(fieldName: string): boolean {
    return !this.userModel[fieldName].trim();
  }
 
  passwordMismatch(): boolean {
    return (this.userModel['Password'] != this.confirmPassword);
  }
 
  isFormValid(): boolean {
    return !(this.isFieldInvalid('Username') || this.isFieldInvalid('Password') || this.isFieldInvalid('UserRole') || this.passwordMismatch() || this.isFieldInvalid('Email') || this.isFieldInvalid('MobileNumber'));
  }
 
  register() {
    this.formSubmitted = true;
    if (this.isFormValid()) {
      this.service.register(this.userModel).subscribe(
        data => {
          this.router.navigate(['login']);
        },
        error => {
         
          this.errorMessage = error.error.message;
          this.closeConfirmationModal();
        }
      )
    }
  }
 
  confirmSubmit() {
    document.getElementById('confirmationModal').style.display = 'flex';
  }
 
  closeConfirmationModal() {
    document.getElementById('confirmationModal').style.display = 'none';
  }
}
