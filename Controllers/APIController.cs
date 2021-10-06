using IutubiProject.Service;
using IutubiRestfulAPI.Database;
using IutubiRestfulAPI.Interfaces;
using IutubiRestfulAPI.Service;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace IutubiProject.Controllers
{
    [Route("api")]
    [ApiController]
    public class ApiController : ControllerBase
    {
        public YoutubeService youtubeService { get; set; }

        public ApiController()
        {
            youtubeService = new YoutubeService(new YoutubeItemDB());
        }

        [HttpGet("{title}")]
        public async Task<IActionResult> Import(string title) 
            => await youtubeService.Import(title);

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => await youtubeService.GetAll();

    }
}
