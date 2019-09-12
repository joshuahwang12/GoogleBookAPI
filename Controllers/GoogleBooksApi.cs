using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace GoogleBooksApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class GoogleBooksApiController : ControllerBase
    {
        // GET api/values/5
        [HttpGet("{query}")]
        public  ActionResult<string> QueryGoogleBooks(string query)
        {
            var service = new BookService();
            return service.Query(query);
        }
    }
    
}
