using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace dotnetapp.Models
{
    public class Announcement
    {
        public int AnnouncementId { get; set; }
        [Required]
        public string Title { get; set;}
         [Required]
        public string Content { get; set; }
         [Required]
        public DateTime PublishedDate { get; set; }
         [Required]
        public string Category { get; set;}
         [Required]
        public string Priority { get; set; }
         [Required]
        public string Status { get; set; }
        


        
    }
}