using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScheduleReact.Database;
using ScheduleReact.Tools;

namespace ScheduleReact.Controllers
{
    
    [Route("api/Dashboard/Lecturers/[action]")]
    public partial class LecturersController : Controller
    {
        private readonly ScheduleDbContext DbContext;
        public LecturersController (ScheduleDbContext dbContext) {
            this.DbContext = dbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetLecturers () {
            var lecturers = await DbContext.Lecturers.ToListAsync ();
            return Json (JsonQuery.Create(true).Result(data: lecturers));
        }
        [HttpPost]
        public async Task<ActionResult> AddOrEdit(Lecturer model)
        {
            var res = new JsonQuery(true);
            res.Parse(ModelState);
            if (ModelState.IsValid)
            {
                Lecturer current;
                if (!string.IsNullOrWhiteSpace(model.Id))
                {
                    if (!await DbContext.Lecturers.AnyAsync(l => l.Id == model.Id))
                    {
                        res.AddError(null, "FirstName", "Лектор не найден");
                        goto res;
                    }
                    DbContext.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
                    current = await DbContext.Lecturers.FirstOrDefaultAsync(l => l.Id == model.Id);
                    var find = await DbContext.Lecturers.FirstOrDefaultAsync(l =>
                        l.FirstName == model.FirstName
                        && l.SecondName == model.SecondName
                        && l.LastName == model.LastName);

                    if (find != null && find.Id != current.Id)
                    {
                        res.AddError(null, "FirstName", "Лектор с таким именем фамилией и отчеством уже есть.");
                        goto res;
                    }
                    DbContext.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.TrackAll;
                    DbContext.Update(model);
                }
                else
                {
                    if (await DbContext.Lecturers.AnyAsync(l =>
                        l.FirstName == model.FirstName
                        && l.SecondName == model.SecondName
                        && l.LastName == model.LastName))
                    {
                        res.AddError(null, "FirstName", "Лектор с таким именем фамилией и отчеством уже есть.");
                        goto res;
                    }

                    await DbContext.Lecturers.AddAsync(model);
                }
                await DbContext.SaveChangesAsync();
            }
            res:
            return Json(res.Result(data: model));
        }
        // [HttpGet("{page?}")]
        // public async Task<ActionResult> Get(int page)
        // {
        //     return Json(JsonQuery.Create(true).Result(data: await DbContext.Lecturers.ToArrayAsync()));
        // }
        [HttpGet("{name?}")]
        public async Task<ActionResult> FindByFullName(string name)
        {
            return Json(JsonQuery.Create(true).Result(
                data: await DbContext.Lecturers.Where(l =>
                    Regex.IsMatch(l.FullName, name, RegexOptions.IgnoreCase | RegexOptions.Multiline))
                .ToArrayAsync()));
        }
        [HttpGet("{id?}")]
        public async Task<ActionResult> GetLecturer(string id)
        {
            var res = new JsonQuery(true);
            if (!await DbContext.Lecturers.AnyAsync(l => l.Id == id))
            {
                res.AddError(null, "query", "Лектор не найден");
            }
            return Json(res.Result(data: await DbContext.Lecturers.FirstOrDefaultAsync(l => l.Id == id)));
        }
        [HttpPost("{id?}")]
        public async Task<ActionResult> Delete(string id)
        {
            var res = new JsonQuery(true);
            if (!await DbContext.Lecturers.AnyAsync(l => l.Id == id))
            {
                res.AddError(null, "query", "Лектор не найден");
            }
            DbContext.Lecturers.Remove(DbContext.Lecturers.FirstOrDefault(l => l.Id == id));
            await DbContext.SaveChangesAsync();
            return Json(res.Result());
        }
    }
}