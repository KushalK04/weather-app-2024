import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import styles from '@/styles/Home.module.css'

const Header: React.FC = () => {
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await router.push(`/weather/${location}`);
  };

  return (
    <header className='flex justify-around mt-10'>
      <a href="/" className={styles.idkytailnotworkforthis}>Raindrops</a>
      <form onSubmit={handleSearch} className="flex gap-10">
        <input
          type="text"
          placeholder="Enter location"
          className="p-4 rounded-xl bg-blue-100"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit" className="p-4 rounded-xl bg-blue-100">Search</button>
      </form>
    </header>
  );
};

export default Header;
