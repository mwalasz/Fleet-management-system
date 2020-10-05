using System;
using System.Collections.Generic;
using System.Linq;

namespace FleetManagement.Extensions
{
    public static class EnumerableExtensions
    {
        public static bool SequencesEqualIgnoreOrder<T>(this IEnumerable<T> source, IEnumerable<T> compared)
        {
            if (source.Count() != compared.Count())
            {
                return false;
            }

            return source.OrderBy(x => x)
                .SequenceEqual(compared.OrderBy(x => x));
        }
    }
}
