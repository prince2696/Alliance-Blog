import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPost } from 'src/app/models/blog-post.model';
import { BlogPostService } from 'src/app/services/blog-post.service';

@Component({
  selector: 'app-user-view-blog',
  templateUrl: './user-view-blog.component.html',
  styleUrls: ['./user-view-blog.component.css']
})
export class UserViewBlogComponent implements OnInit {


  blogPosts: BlogPost[] = [];
  paginatedBlogs:BlogPost[]=[];
  currentPage:number=1;
  itemsPerPage:number=5;
  searchBlogs: string = '';
  userId: number;
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  blogPostIdToEdit: number;
  blogPostIdToDelete: number;

  constructor(private blogPostService: BlogPostService, private route: Router, private router: ActivatedRoute) { }

  ngOnInit(): void {
      this.router.params.subscribe(data => {
      this.userId = +data['id'];
      this.loadBlogPostsByUserId(this.userId);
    });
  }
  
  viewMode: 'card' | 'table' = 'card';

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'card' ? 'table' : 'card';
  }

  loadBlogPostsByUserId(userId: number) {
    this.blogPostService.GetBlogPostsByUserId(userId).subscribe(data => {
      console.log(JSON.stringify(data))
      this.blogPosts = data;
      this.updatePaginatedPosts();
    });
  }
  updatePaginatedPosts(){
    const startIndex=(this.currentPage-1)*this.itemsPerPage;
    const endIndex=startIndex+this.itemsPerPage;
    this.paginatedBlogs=this.blogPosts.slice(startIndex,endIndex);
  }

  changePage(page:number){
    if(page>0 && page<=this.totalPages){
      this.currentPage=page;
      this.updatePaginatedPosts();
    }
  }

  get totalPages():number{
    return Math.ceil(this.blogPosts.length/this.itemsPerPage);
  }


  openEditModal(blogPostId: number) {
    this.blogPostIdToEdit = blogPostId;
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  confirmEdit() {
    this.showEditModal = false;
    this.editBlogPost(this.blogPostIdToEdit);
  }

  openDeleteModal(blogPostId: number) {
    this.blogPostIdToDelete = blogPostId;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  confirmDelete() {
    this.showDeleteModal = false;
    if (this.blogPostIdToDelete !== null) {
      this.blogPostService.deleteBlogPost(this.blogPostIdToDelete)
        .subscribe(() => {
          this.loadBlogPostsByUserId(this.userId);
        });
    }
  }

  editBlogPost(postId: number): void {
    this.route.navigate([`user/add/blog/${postId}`]);
  }

  FindAllUserBlogs(userId: number): void {
    this.blogPostService.GetBlogPostsByUserId(userId).subscribe((data) => {
      if (this.searchBlogs == "") {
        this.blogPosts = data;
        this.updatePaginatedPosts();
      } else {
        this.paginatedBlogs = data.filter(blogs => 
          blogs.Title.toLowerCase().includes(this.searchBlogs.toLowerCase())
        );
      }
    });
  }

}
