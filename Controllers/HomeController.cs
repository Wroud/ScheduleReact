using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScheduleReact.Database;
using ScheduleReact.Tools;

namespace ScheduleReact.Controllers {
    public class HomeController : Controller {
        private readonly ScheduleDbContext DbContext;
        public HomeController (ScheduleDbContext dbContext) {
            this.DbContext = dbContext;
        }
        public IActionResult Index () => View ();

        public IActionResult Error () {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View ();
        }
    }
}