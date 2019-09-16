using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Apis.Books.v1;
using Google.Apis.Books.v1.Data;
using Google.Apis.Services;
using Newtonsoft.Json;

namespace GoogleBooksApi
{
    public class BookService
    {
        private static readonly string API_KEY = "AIzaSyDWvipzjKidrJN7kP2SgjjLBhevcfMB93Q";
        
        private static readonly BooksService Service = new BooksService(new BaseClientService.Initializer
        {
            ApplicationName = "Google Books API",
            ApiKey = API_KEY
        });

        public async Task<string> Query(string query)
        {
            var result = await Service.Volumes.List(query).ExecuteAsync().ConfigureAwait(false);
            if (result != null && result.Items != null)
            {
                var items = result.Items.ToList().Select(n => n.VolumeInfo);
                return JsonConvert.SerializeObject(items);
            }
            return null;
        }
    }
}