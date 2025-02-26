using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/feedback")]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackService _feedbackService;

        private readonly ILogger<AuthenticationController> _logger;

        // Constructor to inject the Feedback service dependency and logger
        public FeedbackController(FeedbackService feedbackService,ILogger<AuthenticationController> logger)
        {
            _feedbackService = feedbackService;
            _logger=logger;
        }

        //Method to retrieve all feedbacks.
        [HttpGet]
        [Authorize(Roles="Admin")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedbacks()
        {
            try
            {
                var feedbacks = await _feedbackService.GetAllFeedbacks();
                return Ok(feedbacks);
            }
            catch (Exception exception)
            {   
                _logger.LogError(exception, "An error occurred while retrieving all feedbacks.");
                return StatusCode(500, new {Message = $"Internal server error: {exception.Message}"});
            }
        }
        
        //Method to retrieve feedback by user ID.
        [HttpGet("{userId}")]
         [Authorize(Roles="User")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbacksByUserId(int userId)
        {
            try
            {
                var feedbacks = await _feedbackService.GetFeedbacksByUserId(userId);
                if (feedbacks == null || !feedbacks.Any())
                {
                    return NotFound(new {Message = "No feedbacks found for this user"});
                }
                return Ok(feedbacks);
            }
            catch (Exception exception)
            {   
                _logger.LogError(exception, "An error occurred while retrieving feedbacks by user ID.");
                return StatusCode(500, new {Message = $"Internal server error: {exception.Message}"});
            }
        }
        
        //Method to add new feedback
        [HttpPost]
         [Authorize(Roles="User")]
        public async Task<ActionResult> AddFeedback([FromBody] Feedback feedback)
        {
            try
            {
                var newFeedback = await _feedbackService.AddFeedback(feedback);
                if (newFeedback)
                {
                    return Ok(new {Message = "Feedback added successfully"});
                }
                return BadRequest(new {Message = "Failed to add feedback"});
            }
            catch (Exception exception)
            {   
                _logger.LogError(exception, "An error occurred while adding feedback.");
                return StatusCode(500, new {Message = $"Internal server error: {exception.Message}"});
            }
        }

        //Method to delete existing feedback
        [HttpDelete("{feedbackId}")]
         [Authorize(Roles="User")]
        public async Task<ActionResult> DeleteFeedback(int feedbackId)
        {
            try
            {
                var feedbackToDelete = await _feedbackService.DeleteFeedback(feedbackId);
                if (feedbackToDelete)
                {
                    return Ok(new {Message = "Feedback deleted successfully"});
                }
                return NotFound(new {Message ="Cannot find any feedback"});
            }
            catch (Exception exception)
            {   
                _logger.LogError(exception, "An error occurred while deleting feedback.");
                return StatusCode(500, new {Message = $"Internal server error: {exception.Message}"});
            }
        }
    }
}
