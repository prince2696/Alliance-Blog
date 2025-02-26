using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace dotnetapp.Models
{
    public class BlogPost
    {
        [Key]
        public int BlogPostId { get; set; }
        [Required]
        public int UserId { get; set; }
        public User? User { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public DateTime PublishedDate { get; set; }

    }
}