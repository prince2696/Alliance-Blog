import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-view-feedback',
  templateUrl: './admin-view-feedback.component.html',
  styleUrls: ['./admin-view-feedback.component.css']
})
export class AdminViewFeedbackComponent implements OnInit {

  feedbacks: Feedback[];
  selectedUser: any;
  isProfileModalOpen: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private feedbackService: FeedbackService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe((data) => {
      this.feedbacks = data;
    });
  }

  showProfile(user: User): void {
    this.selectedUser = user;
    this.isProfileModalOpen = true;
  }

  closeProfileModal(): void {
    this.isProfileModalOpen = false;
    this.selectedUser = null;
  }

  get paginatedPosts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.feedbacks.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  get totalPages() {
    return Math.ceil(this.feedbacks.length / this.itemsPerPage);
  }
}
