"use client";

import { useState, useEffect } from "react";

interface AirQuality {
  pm25: number;
  updatedAt: string;
}

export default function WeatherClient({ airQuality }: { airQuality: AirQuality }) {
  const [bgColor, setBgColor] = useState("bg-green-500");

  useEffect(() => {
    if (airQuality.pm25 <= 50) {
      setBgColor("bg-green-500"); // ดี
    } else if (airQuality.pm25 <= 100) {
      setBgColor("bg-yellow-500"); // ปานกลาง
    } else if (airQuality.pm25 <= 150) {
      setBgColor("bg-orange-500"); // ไม่ดีสำหรับบางกลุ่ม
    } else if (airQuality.pm25 <= 200) {
      setBgColor("bg-red-500"); // ไม่ดี
    } else if (airQuality.pm25 <= 300) {
      setBgColor("bg-purple-500"); // อันตราย
    } else {
      setBgColor("bg-pink-700"); // อันตรายมาก
    }
  }, [airQuality.pm25]);

  return (
    <main className={`min-w-screen flex flex-col items-center justify-center ${bgColor} text-white p-10`}>
      <h1 className="text-3xl font-bold">Air Quality Data</h1>
      <p className="text-xl">PM2.5: {airQuality.pm25}</p>
      <p className="text-lg">Updated At: {airQuality.updatedAt}</p>
    </main>
  );
}
