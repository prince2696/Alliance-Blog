import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import {catchError, tap}  from 'rxjs/operators'
import { Login } from '../models/login.model';
import { ROLE_KEY, TOKEN_KEY, USERID_KEY, USER_NAME } from '../components/constant';
import { apiUrl } from 'src/environments/environment.prod';
import { Announcement } from '../models/announcement.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
            
  public apiUrl = apiUrl;
 
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http:HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private get currentUserValue():User{
    return this.currentUserSubject.value;
  }

  register(newUser: User):Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/api/register`, newUser);
  }
  
  public toSaveUser: User = {
    UserId:0,
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: ''
  };

  login(loginUser: Login): Observable<any> {
    console.log(JSON.stringify(loginUser));
    return this.http.post<any>(`${this.apiUrl}/api/login`, loginUser).pipe(
      tap(response => {
          if (response && response.token) {
          const tokenPart = response.token.split('.');
          let payload = JSON.parse(atob(tokenPart[1]));
          this.toSaveUser.UserId=Number(payload.nameid);
          this.toSaveUser.Email = payload.email;
          this.toSaveUser.Username = payload.name;
          this.toSaveUser.UserRole = payload.role;
          this.toSaveUser.MobileNumber = payload.MobileNumber;
          localStorage.setItem(ROLE_KEY, payload.role);
          localStorage.setItem(TOKEN_KEY, JSON.stringify(response.token));
          localStorage.setItem(USERID_KEY, payload.nameid);
          localStorage.setItem(USER_NAME,payload.name );
        }
      }),
      catchError(this.handleError<any>('login'))
    );
  }
  
  getUser():User{
   return this.toSaveUser;
  }

    isLoggedIn(): boolean {
    return localStorage.getItem(ROLE_KEY) != null;
  }

  isAdmin(): boolean {
    return localStorage.getItem(ROLE_KEY) === 'Admin';
  }

  isUser(): boolean {
    return localStorage.getItem(ROLE_KEY) === 'User';
  }

  logout() {
    localStorage.clear();
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem(TOKEN_KEY));
  }

  getUserId(): number {
    return parseInt(localStorage.getItem(USERID_KEY));
  }
  

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

  
}
