import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement.model';
import { apiUrl } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  
  public apiUrl = apiUrl;

  constructor(public httpClient: HttpClient) { }

  getAllAnnouncements(): Observable<Announcement[]> {
    return this.httpClient.get<Announcement[]>(this.apiUrl + '/api/announcements');
  }

  getAnnouncementById(id: number): Observable<Announcement> {
    return this.httpClient.get<Announcement>(`${this.apiUrl}/api/announcements/${id}`);
  }

  addAnnouncement(announcement: Announcement): Observable<Announcement> {
    return this.httpClient.post<Announcement>(this.apiUrl + '/api/announcements', announcement);
  }

  updateAnnouncement(id: number, announcement: Announcement): Observable<Announcement> {
    return this.httpClient.put<Announcement>(`${this.apiUrl}/api/announcements/${id}`, announcement);
  }

  deleteAnnouncement(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/api/announcements/${id}`);
  }

}
