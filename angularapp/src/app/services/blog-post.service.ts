import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  public apiUrl = apiUrl;
  
  constructor(public http: HttpClient) { }

  getAllBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/api/blogposts`);
  }

  getBlogPostById(id: number): Observable<BlogPost> {
    console.log("blogIdservice");
    return this.http.get<BlogPost>(`${this.apiUrl}/api/blogposts/${id}`);
  }

  addBlogPost(blogPost: BlogPost): Observable<any> {
    console.log("addservice");
    return this.http.post<any>(`${this.apiUrl}/api/blogposts`, blogPost);
  }

  updateBlogPost(id: number, blogPost: BlogPost): Observable<any> {
    console.log("updateservice");
    return this.http.put<any>(`${this.apiUrl}/api/blogposts/${id}`, blogPost);
  }

  deleteBlogPost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/blogposts/${id}`);
  }

  GetBlogPostsByUserId(userId:number):Observable<BlogPost[]>{
    console.log("service");
    return this.http.get<BlogPost[]>(`${this.apiUrl}/api/blogposts/user/${userId}`);
  }
}
