using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace CouchFlicksMvc2.Controllers
{
    public class ApiProxyController : Controller
    {
        // GET: ApiProxy
        [HttpGet]
        public ActionResult Index(string url)
        {
            var result = Json(new { 
                url = url,
                test = "Hello world"
            });

            result.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            return result;
        }

        //public async void TraktAsync(string url)
        //{
        //    AsyncManager.OutstandingOperations.Increment();
        //    using (var client = new HttpClient())
        //    {
        //        client.BaseAddress = new Uri("https://api-v2launch.trakt.tv/");
        //        client.DefaultRequestHeaders.Accept.Clear();
        //        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        //        var response = await client.GetAsync(url);
        //        if (response.IsSuccessStatusCode)
        //        {
                    
        //        }
        //    }
        //}

        public async Task<ActionResult> Trakt(string url)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("trakt-api-key", "669ea220a97b60362877f1b99734de976fd5e9cdaa689390e6d65f8337a151d9");
                client.DefaultRequestHeaders.Add("trakt-api-version", "2");
                var response = await client.GetAsync(url);

                return Json(await response.Content.ReadAsStringAsync(), JsonRequestBehavior.AllowGet);
            }
        }
    }
}