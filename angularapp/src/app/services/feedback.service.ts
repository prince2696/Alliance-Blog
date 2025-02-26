import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { apiUrl } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  public apiUrl = apiUrl;
  
  constructor(public http: HttpClient) { }
 
  sendFeedback(feedback:Feedback):Observable<any>
  {
    return this.http.post<Feedback>(`${this.apiUrl}/api/feedback`,feedback);
  }
  getAllFeedbacksByUserId(userId:number)
  {
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback/${userId}`);
  }
  deleteFeedback(feedbackId:number):Observable<any>
  {
    return this.http.delete<any>(`${this.apiUrl}/api/feedback/${feedbackId}`);
  }
  getFeedbacks():Observable<Feedback[]>
  {
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback`);
  }

  
}
