using LearnMongo.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace LearnMongo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly IWebHostEnvironment webHostEnvironment;

        public EmployeeController(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            this.configuration = configuration;
            this.webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public JsonResult Get()
        {
            MongoClient mongoClient = new(configuration.GetConnectionString("EmployeeAppCon"));
            IMongoCollection<Employee> dbContext = mongoClient.GetDatabase("testDB").GetCollection<Employee>("Employee");

            List<Employee> employees = dbContext.AsQueryable().ToList();

            return new JsonResult(employees);
        }

        [HttpPost]
        public JsonResult Post([FromBody] Employee employee)
        {
            MongoClient mongoClient = new(configuration.GetConnectionString("EmployeeAppCon"));
            IMongoCollection<Employee> dbContext = mongoClient.GetDatabase("testDB").GetCollection<Employee>("Employee");

            int lastEmployeeId = dbContext.AsQueryable().Count();
            employee.EmployeeId = lastEmployeeId + 1;

            dbContext.InsertOne(employee);

            return new JsonResult("Added successfully");
        }

        [HttpPut]
        public JsonResult Put([FromBody] Employee employee)
        {
            MongoClient mongoClient = new(configuration.GetConnectionString("EmployeeAppCon"));
            IMongoCollection<Employee> dbContext = mongoClient.GetDatabase("testDB").GetCollection<Employee>("Employee");

            FilterDefinition<Employee> filter = Builders<Employee>.Filter.Eq("EmployeeId", employee.EmployeeId);
            UpdateDefinition<Employee> update = Builders<Employee>.Update.Set("EmployeeName", employee.EmployeeName)
                .Set("Department", employee.Department)
                .Set("DateOfJoining", employee.DateOfJoining)
                .Set("PhotoFileName", employee.PhotoFileName);


            dbContext.UpdateOne(filter, update);

            return new JsonResult("Updated successfully");
        }

        [HttpDelete]
        [Route("{id:int}")]
        public JsonResult Delete([FromRoute] int id)
        {
            MongoClient mongoClient = new(configuration.GetConnectionString("EmployeeAppCon"));
            IMongoCollection<Employee> dbContext = mongoClient.GetDatabase("testDB").GetCollection<Employee>("Employee");

            FilterDefinition<Employee> filter = Builders<Employee>.Filter.Eq("EmployeeId", id);

            dbContext.DeleteOne(filter);

            return new JsonResult("Deleted successfully");
        }

        [HttpPost]
        [Route("savefile")]
        public JsonResult SaveFile()
        {
            try
            {
                IFormCollection httpRequest = Request.Form;
                IFormFile postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                string physicalPath = webHostEnvironment.ContentRootPath + "/Images/" + fileName;

                using (FileStream stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(fileName);
            }
            catch(Exception ex) 
            {
                return new JsonResult(ex.Message);
            }
        }
    }
}
