using IutubiRestfulAPI.Database;
using IutubiRestfulAPI.Interfaces;
using IutubiRestfulAPI.Service;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Google.Apis.YouTube.v3;
using Google.Apis.Services;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System;


namespace IutubiProject.Service
{
    public class YoutubeService
    {
        private IYoutubeItemDB _youtubeItemDB;

        public YoutubeService(IYoutubeItemDB youtubeItemDB)
        {
            _youtubeItemDB = youtubeItemDB;
        }
       
        public async Task<IActionResult> Import(string title)
        {
            
            var results = await SearchVideos(title);


            if (results.Any())
            {
                await _youtubeItemDB.Insert(results);               
                return new OkObjectResult(results);
            }
            else
            {
                return new OkObjectResult(null);
            }
        }

        public async Task<IActionResult> GetAll()
        {                           
            var result = await _youtubeItemDB.Get();            
            return new OkObjectResult(result);          
        }

        private async Task<List<YoutubeItem>>  SearchVideos(string title)
        {
            var SearchResultsList = new List<YoutubeItem>();
            
            var db = new YoutubeItemDB();

            var youtubeService = new YouTubeService(new BaseClientService.Initializer()
            {
                ApiKey = Environment.GetEnvironmentVariable("API_KEY"),
                ApplicationName = this.GetType().ToString()
            }) ;

            var searchListRequest = youtubeService.Search.List("snippet");
            searchListRequest.Q = title; 
            searchListRequest.MaxResults = 50;
            
            var searchListResponse = await searchListRequest.ExecuteAsync();            
            
            foreach (var item in searchListResponse.Items)
            {
                var SearchItem = new YoutubeItem();
                SearchItem.Title = item.Snippet.Title;
                SearchItem.Description = item.Snippet.Description;
                SearchItem.Kind = item.Id.Kind;
                SearchItem.Thumbnails = item.Snippet.Thumbnails.High.Url;

                switch (item.Id.Kind)
                {
                    case "youtube#video":
                        SearchItem.YoutubeID = item.Id.VideoId;
                        break;

                    case "youtube#channel":
                        SearchItem.YoutubeID = item.Id.ChannelId;
                        break;

                    case "youtube#playlist":
                        SearchItem.YoutubeID = item.Id.PlaylistId;
                        break;
                }

                SearchResultsList.Add(SearchItem);
            }                               

            return SearchResultsList;            
        }
    }
}
