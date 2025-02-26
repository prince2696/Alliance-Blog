import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-user-view-feedback',
  templateUrl: './user-view-feedback.component.html',
  styleUrls: ['./user-view-feedback.component.css']
})
export class UserViewFeedbackComponent implements OnInit {

  feedbacks: Feedback[];
  UserId: number = 0;
  showModal: boolean = false;
  feedbackIdToDelete: number;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private feedbackService: FeedbackService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.UserId = this.authService.getUserId();
    this.feedbackService.getAllFeedbacksByUserId(this.UserId).subscribe(data => {
      this.feedbacks = data;
    });
  }

  openModal(feedbackId: number) {
    this.feedbackIdToDelete = feedbackId;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmDeletion() {
    this.showModal = false;
    if (this.feedbackIdToDelete !== null) {
      this.feedbackService.deleteFeedback(this.feedbackIdToDelete).subscribe(() => {
        this.feedbacks = this.feedbacks.filter(feedback => feedback.FeedbackId !== this.feedbackIdToDelete);
      });
    }
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
