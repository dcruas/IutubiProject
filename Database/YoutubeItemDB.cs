using IutubiRestfulAPI.Interfaces;
using IutubiRestfulAPI.Service;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IutubiRestfulAPI.Database
{
    public class YoutubeItemDB : IYoutubeItemDB
    {
        private string connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
        

        public async Task<List<YoutubeItem>> Get()
        {
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase("Iutubi");
            var collection = database.GetCollection<YoutubeItem>("YoutubeItems");
            var filter = Builders<BsonDocument>.Filter.Empty;
            var sort = Builders<BsonDocument>.Sort.Ascending("time");           
            var list = await collection.FindAsync(new BsonDocument());
            
            
            return list.ToList();
        }

        public async Task<bool> Insert(List<YoutubeItem> resultList)
        {
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase("Iutubi");
            var collection = database.GetCollection<YoutubeItem>("YoutubeItems");

            foreach (var item in resultList)
            {
                try
                {
                    if (collection.CountDocuments(x => x.YoutubeID == item.YoutubeID && x.Kind == item.Kind) == 0)
                        await collection.InsertOneAsync(item);
                }
                catch (Exception)
                {
                    return false;
                }                

            }

            return true;
        }

    }
}
