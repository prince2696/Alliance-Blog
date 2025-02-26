import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/models/announcement.model';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-user-view-announcement',
  templateUrl: './user-view-announcement.component.html',
  styleUrls: ['./user-view-announcement.component.css']
})
export class UserViewAnnouncementComponent implements OnInit {
  announcements: Announcement[] = [];
  paginatedAnnouncements: Announcement[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(public announcementservice: AnnouncementService) { }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.announcementservice.getAllAnnouncements().subscribe(announces => {
      this.announcements = announces.filter(announcement => announcement.Status === "Active");
      this.updatePaginatedAnnouncements();
    });
  }

  updatePaginatedAnnouncements(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAnnouncements = this.announcements.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedAnnouncements();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.announcements.length / this.itemsPerPage);
  }
}
