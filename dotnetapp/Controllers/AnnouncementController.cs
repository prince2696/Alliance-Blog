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
    [Route("api/announcements")]
    public class AnnouncementController : ControllerBase
    {
        private readonly AnnouncementService _announcementService;

        private readonly ILogger<AuthenticationController> _logger;
       
         // Constructor to initialize the AnnouncementService and Logger
        public AnnouncementController(AnnouncementService announcementService,ILogger<AuthenticationController> logger){
              _announcementService=announcementService;
              _logger=logger;
        }
       
         // 1 Get all announcements
        [HttpGet]
        [Authorize(Roles="Admin,User")]//attribute to give role based authorization
        public async Task<ActionResult<IEnumerable<Announcement>>> GetAllAnnouncements()
        {
            try{
                 var announcements = await _announcementService.GetAllAnnouncements();
                  return Ok(announcements);
            }
            catch(Exception exception){
                _logger.LogError(exception, "An error occurred while retrieving all announcements.");
                return StatusCode(500, new { Message = $"An error occurred: {exception.Message}" });
            }
        }
 
    
 
          //  2 Get announcement by ID
        [HttpGet("{announcementId}")]
         [Authorize(Roles="Admin")]
        public async Task<ActionResult<Announcement>> GetAnnouncementById(int announcementId)
        {
            try
            {
                var announcement = await _announcementService.GetAnnouncementById(announcementId);
                if (announcement == null)
                {
                    return NotFound(new { Message = "Announcement not found" });
                }
                return Ok(announcement);
            }
            catch (Exception exception)
            {   
                _logger.LogError(exception, "An error occurred while retrieving the announcement by ID.");
                return StatusCode(500, new { Message = $"An error occurred: {exception.Message}" });
            }
        }
        
         // 3. Add a new announcement
        [HttpPost]
         [Authorize(Roles="Admin")]
        public async Task<ActionResult> AddAnnouncement([FromBody] Announcement announcement)
        {
          try
    
          {
        
            await _announcementService.AddAnnouncement(announcement);
            return Ok(new {Message="Announcement added successfully"});
          }
          catch (Exception exception)
         {
           _logger.LogError(exception, "An error occurred while adding the announcement."); 
          return StatusCode(500, new { Message = $"An error occurred: {exception.Message}" });
         }
       }
        
        // 4. Update an existing announcement
        [HttpPut("{announcementId}")]
         [Authorize(Roles="Admin")]
        public async Task<ActionResult> UpdateAnnouncement(int announcementId, [FromBody] Announcement announcement)
          {
        try
            {

              if(announcementId !=announcement.AnnouncementId)
              {
                return BadRequest(new {Message="Error Occured Id Mismatch"});
              }
        
        var existingAnnouncement = await _announcementService.GetAnnouncementById(announcementId);
        if (existingAnnouncement == null)
         {
            return NotFound(new { Message = "Announcement not found" });
         }

        await _announcementService.UpdateAnnouncement(announcementId, announcement);
        return Ok(new {Message="Announcement updated successfully"});
         }
           catch (Exception exception)
          {  
              _logger.LogError(exception, "An error occurred while updating the announcement.");
             return StatusCode(500, new { Message = $"An error occurred: {exception.Message}" });
            }
         }
           // 5. Delete an announcement
           [HttpDelete("{announcementId}")]
            [Authorize(Roles="Admin")]
        public async Task<ActionResult> DeleteAnnouncement(int announcementId)
          {
         try
           {
        
           var existingAnnouncement = await _announcementService.GetAnnouncementById(announcementId);
           if (existingAnnouncement == null)
           {
            return NotFound(new { Message = "Announcement not found" });
           }

        await _announcementService.DeleteAnnouncement(announcementId);
        return Ok(new {Message="Announcement deleted successfully"});
         }
        catch (Exception exception)
         { 
           _logger.LogError(exception, "An error occurred while deleting the announcement.");
           return StatusCode(500, new { Message = $"An error occurred: {exception.Message}" });
          }
         }



       
    }
}