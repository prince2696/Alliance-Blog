import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from 'src/app/models/blog-post.model';
import { BlogPostService } from 'src/app/services/blog-post.service';

@Component({
  selector: 'app-view-userblog',
  templateUrl: './view-userblog.component.html',
  styleUrls: ['./view-userblog.component.css']
})
export class ViewUserblogComponent implements OnInit {
  

  constructor(private blogPostService:BlogPostService,private router:Router,private route :ActivatedRoute ) { }
  
  blogPost:BlogPost;
  blogId:number;
  ngOnInit(): void {
    this.route.params.subscribe((result)=>{
        this.blogId=+result['id'];
        this.loadBlogPost(this.blogId);
    })
    }
  
  loadBlogPost(blogPostId:number){
    this.blogPostService.getBlogPostById(blogPostId).subscribe((data)=>{
       this.blogPost=data;
    })
  }
}
