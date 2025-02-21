import { Suspense } from "react";
import { WeatherClient } from "@/components";

interface AirQuality {
  pm25: number;
  updatedAt: string;
}

export const revalidate = 30; // Revalidate ทุก 30 วินาที

async function fetchAirQuality(): Promise<AirQuality> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_PM25 as string
  );
  const data = await response.json();

  return {
    pm25: data.data.iaqi.pm25.v,
    updatedAt: data.data.time.s,
  };
}

export default async function WeatherServer() {
  const airQuality = await fetchAirQuality();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <WeatherClient airQuality={airQuality} />
    </Suspense>
  );
}
