import s from "./App.module.css";
import Slider from "./components/Slider/Slider.tsx";
import { useEffect, useState } from "react";
import { Slides } from "./types/types.ts";
import Spinner from "./components/Spinner/Spinner.tsx";
import jsonData from "./data/slides.json";
import { BASE_URL } from "./constants/constants.ts";

const App = () => {
  const [slides, setSlides] = useState<Slides[] | undefined>(undefined);
  const [_error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${BASE_URL}2ac30afd-d98b-4edd-96be-2c84694e34ce`,
        );
        const data = await response.json();

        setSlides(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
          setSlides(jsonData);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (!slides) {
    return null;
  }

  return (
    <div className={s.app}>
      {isLoading ? <Spinner /> : <Slider slides={slides} />}
    </div>
  );
};

export default App;
