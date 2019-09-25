using Google.Apis.Books.v1;
using Google.Apis.Services;
using NUnit.Framework;
using System.Linq;

namespace GoogleBooksApi.Test
{
    public class BookServiceTest
    {
        private static readonly string API_KEY = "AIzaSyDWvipzjKidrJN7kP2SgjjLBhevcfMB93Q";

        private static readonly BooksService Service = new BooksService(new BaseClientService.Initializer
        {
            ApplicationName = "Google Books API",
            ApiKey = API_KEY
        });
        [Test]
        public void TestQuerySearchResults()
        {
            const int resultCount = 10;
            var result = Service.Volumes.List("Gladwell").Execute();
            Assert.AreEqual(resultCount, result.Items.Count);
        }

        [Test]
        public void TestNoResults()
        {
            var result = Service.Volumes.List("fdasasdf").Execute();
            Assert.Null(result.Items);
        }

        [Test]
        public void TestNumberResults()
        {
            var result = Service.Volumes.List("123123").Execute();
            Assert.AreEqual(10, result.Items.Count);
        }

        [Test]
        public void TestPublicationResults()
        {
            var result = Service.Volumes.List("Random House").Execute();
            var listOfBooks = result.Items.ToList().Where(n => n.VolumeInfo.Publisher.Contains("Random House"));
            Assert.IsNotNull(listOfBooks);
        }

        [Test]
        public void TestAuthorResults()
        {
            var result = Service.Volumes.List("J.K. Rowling").Execute();
            var singleBook = result.Items.ToList().Where(n => n.VolumeInfo.Authors.FirstOrDefault() == "J.K. Rowling");
            Assert.IsNotNull(singleBook);
        }
    }
}