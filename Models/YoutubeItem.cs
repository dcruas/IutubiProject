using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace IutubiRestfulAPI.Service
{
    [BsonIgnoreExtraElements]
    public class YoutubeItem
    {
        [BsonIgnoreIfDefault]
        public Object Id { get; set; }

        [BsonElement("youtubeID")]
        public string YoutubeID { get; set; }

        [BsonElement("kind")]
        public string Kind { get; set; }
        [BsonElement("title")]
        public string Title { get; set; }
        [BsonElement("description")]
        public string Description { get; set; }
        [BsonElement("thumbnails")]
        public string Thumbnails { get; set; }
    }
}
