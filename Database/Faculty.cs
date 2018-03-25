using System.ComponentModel.DataAnnotations;
using ScheduleReact.Extensions;

namespace ScheduleReact.Database {
    public class Faculty {
        public string Id { get; set; }

        [Required]
        public string DeanId { get; set; }

        [Required]
        [Trim]
        [StringLength (20, MinimumLength = 2)]
        public string ShortName { get; set; }

        [Required]
        [Trim]
        [StringLength (40, MinimumLength = 2)]
        public string FullName { get; set; }

        public Lecturer Dean { get; set; }
    }
}