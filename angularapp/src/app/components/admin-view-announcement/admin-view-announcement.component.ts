import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Announcement } from 'src/app/models/announcement.model';

@Component({
  selector: 'app-admin-view-announcement',
  templateUrl: './admin-view-announcement.component.html',
  styleUrls: ['./admin-view-announcement.component.css']
})
export class AdminViewAnnouncementComponent implements OnInit {
  announcements: Announcement[] = [];
  announcementsFiltered: Announcement[] = [];
  paginatedAnnouncements: Announcement[] = [];
  searchTitleAnnouncement: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  deleteAnnouncementId: number = 0;

  constructor(private announcementService: AnnouncementService, private router: Router) { }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.announcementService.getAllAnnouncements().subscribe((data) => {
      this.announcements = data;
      this.announcementsFiltered = data;
      this.updatePaginatedAnnouncements();
    });
  }

  findAllAnnouncement(): void {
    if (this.searchTitleAnnouncement) {
      this.announcementsFiltered = this.announcements.filter(event =>
        event.Title.toLowerCase().includes(this.searchTitleAnnouncement.toLowerCase())
      );
    } else {
      this.announcementsFiltered = [...this.announcements];
    }
    this.updatePaginatedAnnouncements();
  }

  updatePaginatedAnnouncements(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAnnouncements = this.announcementsFiltered.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedAnnouncements();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.announcementsFiltered.length / this.itemsPerPage);
  }

  markAsComplement(index: number): void {
    const announcement = this.paginatedAnnouncements[index];
    announcement.Status = announcement.Status === 'Active' ? 'Inactive' : 'Active';
    this.announcementService.updateAnnouncement(announcement.AnnouncementId, announcement).subscribe();
  }

  editAnnouncement(announcementId: number): void {
    this.router.navigate([`admin/add/announcement/${announcementId}`]);
  }

  deleteAnnouncement(): void {
    this.announcementService.deleteAnnouncement(this.deleteAnnouncementId).subscribe(() => {
      this.loadAnnouncements();
    });
    this.closeConfirmationModalDelete();
  }

  confirmSubmitDelete(announcementId: number): void {
    document.getElementById('confirmationModalDelete').style.display = 'flex';
    this.deleteAnnouncementId = announcementId;
  }

  closeConfirmationModalDelete(): void {
    document.getElementById('confirmationModalDelete').style.display = 'none';
  }
}