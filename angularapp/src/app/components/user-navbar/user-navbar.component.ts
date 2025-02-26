import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { USER_NAME, ROLE_KEY, USERID_KEY } from '../constant';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  
  blogSelection:string="";
  FeedbackSelection:string="";

  public savedUser: User = {
    UserId:0,
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: ''
  };
  showModal: boolean = false;
  userName:string=localStorage.getItem(USER_NAME);
  userRole: string=localStorage.getItem(ROLE_KEY);
  userId:number=Number(localStorage.getItem(USERID_KEY));
  blogChange(){
    if(this.blogSelection){
      if(this.blogSelection==='add'){
           this.router.navigate([`user/add/blog`]);
      }
      if(this.blogSelection==='view')
      {
        this.router.navigate([`user/view/blog/${localStorage.getItem(USERID_KEY)}`]);
      }
    }
  }
   
  FeedbackChange(){
    if(this.FeedbackSelection){
      if(this.FeedbackSelection==='add'){
           this.router.navigate([`/user/add/feedback/${localStorage.getItem(USERID_KEY)}`]);
      }
      if(this.FeedbackSelection==='view')
      {
        this.router.navigate([`/user/view/feedback/${localStorage.getItem(USERID_KEY)}`])
      }
    }
  }

  ngOnInit(): void {
    this.savedUser=this.authService.getUser();
  }
 
   
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmLogout() {
    this.showModal = false;
    this.logout();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
