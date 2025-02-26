import { Component, OnInit } from '@angular/core';
import { Announcement } from '../../models/announcement.model';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-announcement',
  templateUrl: './admin-add-announcement.component.html',
  styleUrls: ['./admin-add-announcement.component.css']
})
export class AdminAddAnnouncementComponent implements OnInit {

  announcement: Announcement = {
    Title: '',
    Content: '',
    PublishedDate: new Date(),
    Category: '',
    Priority: '',
    Status: ''
  };

  checkTitle: string = "Add New Announcement";
  announcementId: number = 0;
  isRegister: boolean = true;
  formSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(private announcementService: AnnouncementService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.announcementId = +data['id'];
      this.loadAnnouncement();
    });
  }
  
  loadAnnouncement(): void {
    if (this.announcementId) {
      this.checkTitle = "Edit Announcement";
      this.isRegister = false;
      this.announcementService.getAnnouncementById(this.announcementId).subscribe((data) => {
        this.announcement = data;
      });
    }
  }

  isFieldInvalid(fieldName: string) {
    const value = this.announcement[fieldName];
    if (typeof value === 'string') {
      return !value.trim();
    } else if (value instanceof Date) {
      return isNaN(value.getTime());
    } else {
      return value == null;
    }
  }

  isFormValid() {
    const fields = ['Title', 'Content', 'Category', 'Priority', 'Status'];

    for (let field of fields) {
      if (this.isFieldInvalid(field)) {
        this.errorMessage = `${field} cannot be empty`;
        return false;
      }
    }
    this.errorMessage = '';
    return true;
  }

  onAddSubmit(form: any) {
    if (this.isFormValid()) {
      this.announcementService.addAnnouncement(this.announcement).subscribe((result) => {
        this.formSubmitted = true;
        this.router.navigate(['/admin/view/announcement']);
      });
    } else {
      this.closeConfirmationModal();
    }
  }

  onEditSubmit(form: any) {
    if (this.isFormValid()) {
      this.announcementService.updateAnnouncement(this.announcement.AnnouncementId, this.announcement).subscribe((result) => {
        this.formSubmitted = true;
        this.router.navigate(['/admin/view/announcement']);
      });
    } else {
      this.closeConfirmationModal();
    }
  }

  close() {
    this.router.navigate(['/admin/view/announcement']);
  }

  confirmSubmit() {
    this.updateErrorMessage();
    document.getElementById('confirmationModal').style.display = 'flex';
  }

  closeConfirmationModal() {
    document.getElementById('confirmationModal').style.display = 'none';
  }

  updateErrorMessage() {
    const fields = ['Title', 'Content', 'Category', 'Priority', 'Status'];

    for (let field of fields) {
      if (this.isFieldInvalid(field)) {
        this.errorMessage = `${field} cannot be empty`;
        return;
      }
    }
    this.errorMessage = '';
  }
}
