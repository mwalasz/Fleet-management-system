using UnitsNet;
using UnitsNet.Units;

namespace FleetManagement.Extensions
{
    public static class ConvertExtensions
    {
        public static double FromMetersToKilometers(this double meters)
        {
            return Length.FromMeters(meters).ToUnit(LengthUnit.Kilometer).Value;
        }

        public static double FromMetersPerSecondToKilometersPerHour(this double metersPerSeconds)
        {
            return Speed.FromMetersPerSecond(metersPerSeconds).ToUnit(SpeedUnit.KilometerPerHour).Value;
        }

        public static double FromKilometersPerHourToMetersPerSecond(this double kilometersPerHour)
        {
            return Speed.FromKilometersPerHour(kilometersPerHour).ToUnit(SpeedUnit.MeterPerSecond).Value;
        }

        public static double FromSecondsToMinutes(this double seconds)
        {
            return Duration.FromSeconds(seconds).ToUnit(DurationUnit.Minute).Value;
        }

        public static double FromSecondsToHours(this double seconds)
        {
            return Duration.FromSeconds(seconds).ToUnit(DurationUnit.Hour).Value;
        }
    }
}
