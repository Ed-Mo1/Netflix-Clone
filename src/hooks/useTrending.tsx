import { useEffect, useState } from "react";
import { Movie } from "../types/movieType";
import { Tv } from "../types/tvType";
const useTrending = (
  type: string,
  time: string
): { data: (Movie | Tv)[]; loading: boolean } => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWQxMjlhYWEzODhjYWNkOGU0OWU2MmE3MDZmMGIzZSIsIm5iZiI6MTcyMTEyOTY1Mi43NzE4NzEsInN1YiI6IjY2MGYyOTQ4ZDZkYmJhMDE2MzcxMzBiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H-nUYGa_7TJJaqkO3ZDQtLDMLd3W73jH-bij5bB8liI",
    },
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<(Movie | Tv)[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/${type}/${time}?language=en-US&page=1`,
          options
        );
        const data = await response.json();
        setData(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, []);
  return { data, loading };
};

export default useTrending;
