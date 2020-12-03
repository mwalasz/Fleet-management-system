using FleetManagement.Entities.Trips.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;

namespace FleetManagement.Extensions
{
    public static class CoordinatesExtensions
    {
        public static byte[] ConvertToBlob(this Coordinates[] coordinates)
        {
            try
            {
                BinaryFormatter bf = new BinaryFormatter();
                MemoryStream ms = new MemoryStream();
                bf.Serialize(ms, coordinates);

                return ms.ToArray();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static List<Coordinates> ConvertToCoordinates(this byte[] coordinates)
        {
            try
            {
                BinaryFormatter bf = new BinaryFormatter();
                MemoryStream ms = new MemoryStream(coordinates);

                return ((Coordinates[])bf.Deserialize(ms)).ToList();
            }
            catch (Exception)
            {
                return new List<Coordinates>();
            }
        }
    }
}
