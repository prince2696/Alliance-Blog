using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class FeedbackService
    {
        private readonly ApplicationDbContext _context;

        public FeedbackService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Feedback>> GetAllFeedbacks()
        {
            return await _context.Feedbacks.Include(user=>user.User).ToListAsync();
        }

        public async Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId)
        {
            return await _context.Feedbacks.Where(feedback => feedback.UserId == userId).ToListAsync();
        }

        public async Task<bool> AddFeedback(Feedback feedback)
        {
            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteFeedback(int feedbackId)
        {
            var feedback = await _context.Feedbacks.FindAsync(feedbackId);
            if (feedback == null)
            {
                return false;
            }

            _context.Feedbacks.Remove(feedback);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<User> GetUserByUserId(int userId){
           return await _context.Users.FirstOrDefaultAsync(user=>user.UserId==userId);
        }

    }
}