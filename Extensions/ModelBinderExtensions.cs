using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace ScheduleReact.Extensions {
    public class TrimAttribute : ValidationAttribute {
        private bool _critic;

        public TrimAttribute (bool Critic = false, string ErrorMessage = "Нельзя использовать пробел в конце и начале, двойные пробелы") {
            _critic = Critic;
            this.ErrorMessage = ErrorMessage;
        }

        protected override ValidationResult IsValid (object value, ValidationContext validationContext) {
            if (value?.GetType () == typeof (string)) {
                var text = value as string;
                int length = text.Length;
                if (length > 0) {
                    text = Regex.Replace (text.Trim (), @"\s+", " ");
                    validationContext.ObjectType.GetProperty (validationContext.MemberName).SetValue (validationContext.ObjectInstance, text);

                    if (length != text.Length && _critic) {

                        return new ValidationResult (ErrorMessage);
                    }
                }
            }
            return ValidationResult.Success;
        }
    }
}