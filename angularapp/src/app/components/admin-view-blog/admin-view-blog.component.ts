import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/models/blog-post.model';
import { BlogPostService } from 'src/app/services/blog-post.service';

@Component({
  selector: 'app-admin-view-blog',
  templateUrl: './admin-view-blog.component.html',
  styleUrls: ['./admin-view-blog.component.css']
})
export class AdminViewBlogComponent implements OnInit {

  blogPostId: number;
  blogpost: BlogPost[] = [];
  searchBlogs: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private blogpostService: BlogPostService) { }

  ngOnInit(): void {
    this.loadPost();
  }

  loadPost() {
    this.blogpostService.getAllBlogPosts().subscribe(posts => {
      this.blogpost = posts;
    });
  }

  approvedPost(item) {
    item.Status = 'Approved';
    this.blogpostService.updateBlogPost(item.BlogPostId, item).subscribe(() => {
    });
  }

  cancelPost(item) {
    item.Status = 'Rejected';
    this.blogpostService.updateBlogPost(item.BlogPostId, item).subscribe(() => {
    });
  }

  FindAllBlogs(): void {
    this.blogpostService.getAllBlogPosts().subscribe((data) => {
      if (this.searchBlogs == "") {
        this.blogpost = data;
      } else {
        this.blogpost = data.filter(blogs => 
          blogs.Title.toLowerCase().includes(this.searchBlogs.toLowerCase())
        );
      }
    });
  }

  get paginatedPosts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    console.log(`Displaying items from ${startIndex} to ${endIndex}`);
    return this.blogpost.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  get totalPages() {
    return Math.ceil(this.blogpost.length / this.itemsPerPage);
  }
}