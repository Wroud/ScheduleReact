using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ScheduleReact.Tools
{
    public class JsonQuery
    {
        public static JsonQuery Create(bool state)
        {
            return new JsonQuery(state);
        }

        private List<object> Errors;
        public bool State;
        public JsonQuery(bool state)
        {
            Errors = new List<object>();
            State = state;
        }

        public JsonQuery AddError(string id, string name, string message)
        {
            if (string.IsNullOrEmpty(id))
            {
                Errors.Add(new { id = default(object), name = name, message = message });
            }
            else
            {
                Errors.Add(new { id = id, name = default(object), message = message });
            }
            State = false;
            return this;
        }

        public JsonQuery Parse(ModelStateDictionary model)
        {
            foreach (var er in model.Where(v => v.Value.ValidationState == ModelValidationState.Invalid))
            {
                Errors.Add(new { id = default(object), name = er.Key, message = er.Value.Errors.First().ErrorMessage });
                State = false;
            }
            return this;
        }
        public object Post(string url, string method = "post", object data = default(object))
        {
            return new
            {
                state = State,
                errors = Errors.ToArray(),
                post = new
                {
                    url = url,
                    data = data,
                    method = method
                }
            };
        }
        public object Result(string redirect = null, object data = null)
        {
            return new
            {
                state = State,
                data = data,
                errors = Errors.ToArray(),
                redirect = redirect
            };
        }
    }
}