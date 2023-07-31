using LearnMongo.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace LearnMongo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public DepartmentController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            MongoClient mongoClient = new(configuration.GetConnectionString("EmployeeAppCon"));

            MongoDB.Driver.Linq.IMongoQueryable<Department> dbList = mongoClient.GetDatabase("testDB").GetCollection<Department>("Department").AsQueryable();

            return new JsonResult(dbList);
        }

        [HttpPost]
        public JsonResult Post([FromBody] Department department)
        {
            MongoClient mongoClient = new(configuration.GetConnectionString("EmployeeAppCon"));
            IMongoCollection<Department> dbContext = mongoClient.GetDatabase("testDB").GetCollection<Department>("Department");

            int lastDepartmentId = dbContext.AsQueryable().Count();
            department.DepartmentId = lastDepartmentId + 1;

            dbContext.InsertOne(department);

            return new JsonResult("Added successfully");
        }

        [HttpPut]
        public JsonResult Put([FromBody] Department department)
        {
            MongoClient mongoClient = new(configuration.GetConnectionString("EmployeeAppCon"));
            IMongoCollection<Department> dbContext = mongoClient.GetDatabase("testDB").GetCollection<Department>("Department");

            FilterDefinition<Department> filter = Builders<Department>.Filter.Eq("DepartmentId", department.DepartmentId);
            UpdateDefinition<Department> update = Builders<Department>.Update.Set("DepartmentName", department.DepartmentName);

            dbContext.UpdateOne(filter, update);

            return new JsonResult("Updated successfully");
        }

        [HttpDelete]
        [Route("{id:int}")]
        public JsonResult Delete(int id)
        {
            MongoClient mongoClient = new(configuration.GetConnectionString("EmployeeAppCon"));
            IMongoCollection<Department> dbContext = mongoClient.GetDatabase("testDB").GetCollection<Department>("Department");

            FilterDefinition<Department> filter = Builders<Department>.Filter.Eq("DepartmentId", id);

            dbContext.DeleteOne(filter);

            return new JsonResult("Deleted successfully");
        }
    }
}
