using Microsoft.AspNetCore.Mvc;
using ScheduleReact.Database;

namespace ScheduleReact.Controllers
{
    [Route("api/[controller]/[action]/{id?}")]
    public partial class DashboardController : Controller
    {
        private readonly ScheduleDbContext DbContext;
        public DashboardController (ScheduleDbContext dbContext) {
            this.DbContext = dbContext;
        }
    }
}