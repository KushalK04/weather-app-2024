import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import styles from '../src/styles/Home.module.css'

const Header: React.FC = () => {
  const [locationInput, setLocationInput] = useState("");
  const router = useRouter();

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await router.push(`/weather/${locationInput}`);
  };

  return (
    <header className='flex justify-around mt-10'>
      <h1 className={styles.idkytailnotworkforthis}>Raindrops</h1>
      <form onSubmit={handleSearch} className="flex gap-10">
        <input
          type="text"
          placeholder="Enter location"
          className="p-4 rounded-xl bg-blue-100"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
        />
        <button type="submit" className="p-4 rounded-xl bg-blue-100">Search</button>
      </form>
    </header>
  );
};

export default Header;
