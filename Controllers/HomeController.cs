using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
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

        [HttpGet]
        public async Task<IActionResult> GetLecturers () {
            var lecturers = await DbContext.Lecturers.ToListAsync ();
            return Json (JsonQuery.Create(true).Result(data: lecturers));
        }

        public IActionResult Error () {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View ();
        }
    }
}