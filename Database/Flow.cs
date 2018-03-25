using System;
using System.ComponentModel.DataAnnotations;
using ScheduleReact.Extensions;

namespace ScheduleReact.Database
{
    public class Flow
    {
        public string Id { get; set; }
        [Required]
        public int Year { get; set; }
        public DateTime Date { get; set; }
        [Required]
        [Trim]
        [StringLength(20, MinimumLength = 2)]
        public string Name { get; set; }
    }
}