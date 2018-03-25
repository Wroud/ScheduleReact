using System.ComponentModel.DataAnnotations;
using ScheduleReact.Extensions;

namespace ScheduleReact.Database {
    public enum Gender {
        Male,
        Female
    }
    public class Lecturer {
        public string Id { get; set; }

        [Required]
        [Trim]
        [StringLength (20, MinimumLength = 2)]
        public string FirstName { get; set; }

        [Required]
        [Trim]
        [StringLength (20, MinimumLength = 2)]
        public string LastName { get; set; }

        [Required]
        [Trim]
        [StringLength (20, MinimumLength = 2)]
        public string SecondName { get; set; }

        [Required]
        [Trim]
        [StringLength (20, MinimumLength = 2)]
        public string FullName { get; set; }

        [Required]
        [Trim]
        public Gender Gender { get; set; }
    }
}