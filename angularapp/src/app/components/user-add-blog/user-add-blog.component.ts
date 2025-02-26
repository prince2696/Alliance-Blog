import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BlogPost } from 'src/app/models/blog-post.model';
import { BlogPostService } from 'src/app/services/blog-post.service';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-user-add-blog',
  templateUrl: './user-add-blog.component.html',
  styleUrls: ['./user-add-blog.component.css']
})
export class UserAddBlogComponent implements OnInit {
  blogPost: BlogPost = {
    UserId: this.authService.getUserId(),
    Title: '',
    Content: '',
    Status: 'Pending',
    PublishedDate: new Date(),
    BlogPostId: 0
  };
 
  userExistingPost: BlogPost = {
    UserId: this.authService.getUserId(),
    Title: '',
    Content: '',
    Status: 'Pending',
    PublishedDate: new Date(),
    BlogPostId: 0
  };
 
  existingPosts: BlogPost[] = [];
  userExistingPosts: BlogPost[] = [];
  blogPostId: number = 0;
  formSubmitted: boolean = false;
  submitted: boolean = false;
  blogPostExists: boolean = false;
  isAddMode: boolean = true;
  id: number;
  showModal: boolean = false;
 
  constructor(private blogpostService: BlogPostService, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) { }
 
  ngOnInit(): void {
    this.isAddMode = !this.activatedRoute.snapshot.params['id'];
    if (!this.isAddMode) {
      this.activatedRoute.paramMap.subscribe((data) => {
        this.blogPostId = +data.get("id");
        this.getBlogById(this.blogPostId);
      });
 
      this.blogpostService.getBlogPostById(this.blogPostId).subscribe(data => {
        this.userExistingPost = data;
      });
    }
    this.blogpostService.getAllBlogPosts()
      .subscribe(
        posts => {
          this.existingPosts = posts;
        }
      );
  }
 
  getBlogById(blogPostId: number) {
    this.blogpostService.getBlogPostById(blogPostId).subscribe(data => {
      this.blogPost = data;
    });
  }
 
  onTitleChanged(title: string) {
    for (let post of this.existingPosts) {
      if (post.Title === title.trim()) {
        this.blogPostExists = true;
 
        if (!this.isAddMode && this.userExistingPost.Title === title.trim()) {
          this.blogPostExists = false;
        }
        break;
      } else {
        this.blogPostExists = false;
      }
    }
  }
 
  openModal() {
    this.showModal = true;
  }
 
  closeModal() {
    this.showModal = false;
  }
  errorMessage:string='';
  confirmSubmission() {
    this.showModal = false;
   if(this.isFormValid()){
    if (this.isAddMode) {
      this.blogpostService.addBlogPost(this.blogPost)
        .subscribe(() => {
          this.submitted = true;
          this.router.navigate([`user/view/blog/`, this.authService.getUserId()]);
        });
    } else {
      this.blogpostService.updateBlogPost(this.blogPostId, this.blogPost)
        .subscribe((data) => {
          this.submitted = true;
          this.router.navigate([`user/view/blog/`, this.authService.getUserId()]);
        });
    }
   }
   else{
    this.errorMessage="field is required";
   }
  }
 
  onSubmit(form: NgForm): void {
    if (this.isAddMode) {
      this.addBlogPost();
    } else {
      this.updateBlogPost(this.blogPostId, form.value);
    }
  }
 
  addBlogPost() {
    this.formSubmitted = true;
    if (this.isFormValid()) {
      this.openModal();
    }
  }
 
  updateBlogPost(id: number, blogPost: BlogPost) {
    blogPost = this.blogPost;
    this.formSubmitted = true;
    if (this.isFormValid()) {
      this.openModal();
    }
  }
 
  isInvalid(field: string): boolean {
    return !this.blogPost[field].trim();
  }
 
  isFormValid() {
    const ar = ["Title", "Content"];
    for (let f of ar) {
      if (this.isInvalid(f)) {
        return false;
      }
    }
    return true;
  }
 
  close() {
    this.router.navigate([`user/view/blog/`, this.authService.getUserId()]);
  }
}