using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Data;
using dotnetapp.Exceptions;

namespace dotnetapp.Services
{
    public class BlogPostService
    {
        private readonly ApplicationDbContext _context;

        public BlogPostService(ApplicationDbContext context)
        {
            _context = context;


        }

        public async Task<IEnumerable<BlogPost>> GetAllBlogPosts()
        {
            return await _context.BlogPosts.Include(blogpost=>blogpost.User).ToListAsync();

        }
        public async Task<BlogPost> GetBlogPostById(int blogPostId)
        {
            return await _context.BlogPosts.Include(blogpost=>blogpost.User).FirstOrDefaultAsync(blogpost=>blogpost.BlogPostId == blogPostId);
        }
        public async Task<IEnumerable<BlogPost>> GetBlogPostsByUserId(int userId)
        {
            return await _context.BlogPosts.Include(blogpost=>blogpost.User).Where(blogpost=>blogpost.UserId == userId).ToListAsync();
        }
        public async Task<bool> AddBlogPost(BlogPost blogPost)
        {
            if (await _context.BlogPosts.AnyAsync(blogpost => blogpost.Title == blogPost.Title))
            {
                throw new BlogPostException("A blog post with the same title already exists");
            }
            _context.BlogPosts.Add(blogPost);
            await _context.SaveChangesAsync();
            return true;

        
        }
        public async Task<bool> UpdateBlogPost(int blogPostId, BlogPost blogPost)
        {
            var existingBlogPost = await _context.BlogPosts.FindAsync(blogPostId);
            if(existingBlogPost == null)
            {
                return false;

            }
            existingBlogPost.Title = blogPost.Title;
            existingBlogPost.Content = blogPost.Content;
            existingBlogPost.Status = blogPost.Status;
            existingBlogPost.PublishedDate = blogPost.PublishedDate;
            await _context.SaveChangesAsync();
            return true;

        }
        public async Task<bool> DeleteBlogPost(int blogPostId)
        {
            var blogPost = await _context.BlogPosts.FindAsync(blogPostId);
            if(blogPost == null)
            {
                return false;
            }
            _context.BlogPosts.Remove(blogPost);
            await _context.SaveChangesAsync();
            return true;
        }

        
    }
}