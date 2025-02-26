using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Services;
using dotnetapp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/blogposts")]
    public class BlogPostController : ControllerBase
    {
        private readonly BlogPostService _blogPostService;

         private readonly ILogger<AuthenticationController> _logger;

        // Constructor to inject the BlogPostService dependency and logger
        public BlogPostController(BlogPostService blogPostService,ILogger<AuthenticationController> logger)
        {
            _blogPostService = blogPostService;
            _logger=logger;

        }
        // GET: api/blogposts Get All Blogs
        [HttpGet]
        [Authorize(Roles="Admin,User")]
        public async Task<ActionResult<IEnumerable<BlogPost>>> GetAllBlogPosts()
        {

            try
            {
                var blogPost = await _blogPostService.GetAllBlogPosts();
                return Ok(blogPost);
            }
            catch (Exception exception)
            {   
                _logger.LogError(exception, "An error occurred while getting all blog posts.");
                return StatusCode(500, new {  Message = $"Internal server error: {exception.Message}" });
            }
        }
        // GET: api/blogposts/{postId} Get Blog By postId
        [HttpGet("{postId}")]
        [Authorize(Roles="User")]
        public async Task<ActionResult<BlogPost>> GetBlogPostById(int postId)
        {
            try
            {
                var blogPost = await _blogPostService.GetBlogPostById(postId);
                if (blogPost == null)
                {   
                    return NotFound(new { Message="Blog post not found" });
                }
                return Ok(blogPost);


            }
            catch (Exception exception)
            {   
                _logger.LogError(exception, "An error occurred while getting the blog post by ID.");
                return StatusCode(500, new { Message = $"Internal server error: {exception.Message}" });
            }

        }
        // GET: api/blogposts/user/{userId} Get Blog By userId
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<BlogPost>>> GetBlogPostsByUserId(int userId)
        {
            try
            {
                var blogPost = await _blogPostService.GetBlogPostsByUserId(userId);
                if (userId == null || !blogPost.Any())
                {
                    return NotFound(new { Message="No blog posts found for this user" });
                }
                return Ok(blogPost);
            }
            catch (Exception exception)
            {   
                _logger.LogError(exception, "An error occurred while getting blog posts by user ID.");
                return StatusCode(500, new { Message = $"Internal server error: {exception.Message}" });
            }

        }
        // POST: api/blogposts Add Blog
        [HttpPost]
        [Authorize(Roles="User")]
        public async Task<ActionResult> AddBlogPost([FromBody] BlogPost blogPost)
        {
            try
            {
                if (blogPost == null)
                {
                    return BadRequest(new { Message = "BlogPost data is null" });
                }
                var success = await _blogPostService.AddBlogPost(blogPost);

                if (success)
                {
                    return Ok(new {Message="Blog post added successfully"});
                }
                return StatusCode(500, new { Message = "Failed to add blog" });


            }
            catch (Exception exception)
            {   
                 _logger.LogError(exception, "An error occurred while adding a blog post.");
                return StatusCode(500, new { Message = $"Internal server error: {exception.Message}" });
            }





        }
        // PUT: api/blogposts/{postId} Update Blog 
        [HttpPut("{postId}")]
        [Authorize(Roles="Admin,User")]
        public async Task<ActionResult> UpdateBlogPost(int postId, [FromBody] BlogPost blogPost)
        {
            try
            {
                if (blogPost == null || postId !=blogPost.BlogPostId)
                {
                    return BadRequest(new {Message="BlogPost data is null"});
                }
                var success = await _blogPostService.UpdateBlogPost(postId, blogPost);
                if (success)
                {
                    return Ok(new {Message="Blog post updated successfully"});
                }
                return NotFound(new { Message = "Blog post not found" });
            }
            catch (Exception exception)
            {   
                _logger.LogError(exception, "An error occurred while updating the blog post.");
                return StatusCode(500, new { Message = $"Internal server error: {exception.Message}" });
            }
        }

        // DELETE: api/blogposts/{postId} Delete Blog by postId
        [HttpDelete("{postId}")]
        [Authorize(Roles="User")]
        public async Task<ActionResult> DeleteBlogPost(int postId)
        {
            try
            {
                var success = await _blogPostService.DeleteBlogPost(postId);
                if (success)
                {
                    return Ok(new {Message="Blog post deleted successfully"});
                }
                return NotFound(new { Message = "Blog post not found" });
            }
            catch (Exception exception)
            {   
                _logger.LogError(exception, "An error occurred while deleting the blog post.");
                return StatusCode(500, new { Message = $"Internal server error: {exception.Message}" });
            }
        }




    }
}