
import React from "react";
import { Footer, NavBar, CardServer, WeatherServer } from "@/components"
import Counter from "@/components/ui/counter/counter";

export default function page() {
  

  return (
    <div className="font-[family-name:var(--font-line-seed-sans)]">
      <NavBar />

      <section className="flex flex-col items-center gap-14 mt-5 mb-7">
        <WeatherServer />
      </section>

      <section className="flex flex-col items-center gap-14 mt-5 mb-7">
        <Counter />
      </section>


      <section className="flex flex-col items-center gap-14 mt-5 mb-7">
        <CardServer />
      </section>

      <Footer />
    </div>
  )
}
