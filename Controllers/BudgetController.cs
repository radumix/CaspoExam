using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

namespace CaspoExam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetController : ControllerBase
    {

        [HttpPost]
        [Route("AddBudget")]
        public async Task<IActionResult> AddBudget([FromBody] object model)
        {

            IActionResult response = Unauthorized();

            try
            {
                var data = JsonConvert.DeserializeObject<BudgetModel>(model.ToString());

                BudgetClass budgetClass = new BudgetClass();
                var result = await Task.Run(() => budgetClass.Add(data));  //await execute.RegisterCustmer(data);

                response = Ok(new { Results = result });
            }
            catch (Exception e)
            {
                response = StatusCode(419);
            }


            return response;
        }


        [HttpGet]
        [Route("GetBudget")]
        public async Task<IActionResult> GetBudget()
        {

            IActionResult response = Unauthorized();

            try
            {
                BudgetClass budgetClass = new BudgetClass();
                //string result = await execute.AllBarangay();
                string result = await Task.Run(() => budgetClass.List());
                var data = JsonConvert.DeserializeObject<BudgetModel[]>(result);
                response = Ok(new { results = data });
            }
            catch (Exception e)
            {
                response = StatusCode(419);
                throw;
            }


            return response;
        }

        [HttpGet]
        [Route("GetBudgetByCQ")]
        public async Task<IActionResult> GetBudgetByCQ([FromQuery] string country, string quarter)
        {

            IActionResult response = Unauthorized();

            try
            {
                BudgetClass budgetClass = new BudgetClass();
                //string result = await execute.AllBarangay();
                string result = await Task.Run(() => budgetClass.SearchBudget(country, quarter));
                var data = JsonConvert.DeserializeObject<BudgetModel[]>(result);
                response = Ok(new { results = data });
            }
            catch (Exception e)
            {
                response = StatusCode(419);
                throw;
            }


            return response;
        }

    }
}
