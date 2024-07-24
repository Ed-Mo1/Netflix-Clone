import { useEffect, useState } from "react";
import { Movie } from "../types/movieType";
import { Tv } from "../types/tvType";

const useCategory = (
  typeDetails: string,
  category: string
): { data: (Movie | Tv)[]; loading: boolean; typeDetails: string } => {
  const [data, setData] = useState<(Movie | Tv)[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const url = `https://api.themoviedb.org/3/${typeDetails}/${category}?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWQxMjlhYWEzODhjYWNkOGU0OWU2MmE3MDZmMGIzZSIsIm5iZiI6MTcyMTEyOTY1Mi43NzE4NzEsInN1YiI6IjY2MGYyOTQ4ZDZkYmJhMDE2MzcxMzBiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H-nUYGa_7TJJaqkO3ZDQtLDMLd3W73jH-bij5bB8liI",
    },
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setData(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      fetchData();
    };
  }, []);
  return { data, loading, typeDetails };
};

export default useCategory;
