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
        
        public static readonly BooksService Service = new BooksService(new BaseClientService.Initializer
        {
            ApplicationName = "Google Books API",
            ApiKey = API_KEY
        });

        public string Query(string query)
        {
            var result = Service.Volumes.List(query).Execute();
            if (result != null && result.Items != null)
            {
                var items = result.Items.ToList();
                var ret = new List<Volume.VolumeInfoData>();
                for (var index = 0; index < items.Count; index++)
                {
                    var item = items[index];
                    ret.Add(item.VolumeInfo);
                }
                return JsonConvert.SerializeObject(ret);
            }
            return null;
        }
    }
}