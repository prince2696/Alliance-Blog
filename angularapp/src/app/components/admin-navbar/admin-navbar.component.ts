import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ROLE_KEY, USER_NAME } from '../constant';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  
  announcementSelection:string="";

  public savedUser: User = {
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: ''
  };

  userName:string=localStorage.getItem(USER_NAME);
  userRole: string=localStorage.getItem(ROLE_KEY);
  
  announcementChange(){
    if(this.announcementChange){
      if(this.announcementSelection==='add'){
           this.router.navigate(['/admin/add/announcement']);
      }
      if(this.announcementSelection==='view')
      {
        this.router.navigate(['admin/view/announcement'])
      }
    }
  }
  ngOnInit(): void {
    this.savedUser=this.authService.getUser();
  }
 
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  confirmSubmit() {
    document.getElementById('confirmationModalLogout').style.display = 'flex';
  }

  closeConfirmationModal() {
    document.getElementById('confirmationModalLogout').style.display = 'none';
  }
}
