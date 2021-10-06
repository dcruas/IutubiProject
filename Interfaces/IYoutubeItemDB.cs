using IutubiRestfulAPI.Service;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IutubiRestfulAPI.Interfaces
{
    public interface IYoutubeItemDB
    {
        Task<List<YoutubeItem>> Get();
        Task<bool> Insert(List<YoutubeItem> resultList);


    }
}