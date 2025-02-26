using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Exceptions
{
    
    public class BlogPostException : Exception
    {
        public BlogPostException() { }
        public BlogPostException(string message) : base(message) { }
        public BlogPostException(string message, Exception inner) : base(message, inner) { }
        
    }   
}