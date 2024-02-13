import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Header from "../../components/header";
import Weathfoot from "../../components/footer";

export default function Home() {
  const [locationInput, setLocationInput] = useState("");
  const router = useRouter();

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await router.push(`/weather/${locationInput}`);
  };

  return (
    <>
      <Header/>
      

      <main className='flex flex-col justify-center items-center p-40'>
        <div className='mb-6 text-left'>
          <ul className='list-decimal'>
            <li>Enter a Location</li>
            <li>Find the City's Current Weather, Tomorrow's Forecast, and 6-Day Forecast</li>
          </ul>
        </div>
        <form onSubmit={handleSearch} className='flex flex-col gap-10 mt-10'>
          <input
            type="text"
            placeholder="Enter location"
            className='p-4 rounded-xl bg-blue-100'
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
          <button type="submit" className='p-4 rounded-xl bg-blue-100'>Submit</button>
        </form>
      </main>
      <Weathfoot/>
    </>

  );
}
