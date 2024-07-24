import React, { useEffect } from "react";
import { Movie } from "../types/movieType";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Tv } from "../types/tvType";
import { useNavigate } from "react-router-dom";
const CardsList = ({
  data,
  title,
  loading,
  typeDetails,
}: {
  data: (Movie | Tv)[];
  title: string;
  loading: boolean;
  typeDetails?: "movie" | "tv";
}) => {
  const cardsREf = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    cardsREf.current?.addEventListener("wheel", (e) => {
      e.preventDefault();
      (cardsREf.current as HTMLDivElement).scrollLeft += e.deltaY;
    });
  }, []);
  return (
    <div className="space-y-6 ">
      <p className="text-white text-2xl font-semibold">{title}</p>
      <div
        ref={cardsREf}
        className="flex pb-2 scroll gap-3 w-full flex-nowrap overflow-x-auto items-start"
      >
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray h-[135px] max-sm:max-w-[500px] w-[240px] rounded"></div>
              </div>
            ))
          : data?.map((movie) => (
              <div
                key={movie.id}
                onClick={() =>
                  navigate(`/Netflix-Clone/${typeDetails || movie.media_type}/${movie.id}`)
                }
                className="flex-shrink-0 space-y-2 relative"
              >
                <div className="relative before:absolute before:inset-0 cursor-pointer before:z-40 hover:before:opacity-0 before:transition-all before:bg-black before:opacity-30 ">
                  <LazyLoadImage
                    effect="blur"
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    className="max-w-[240px] max-sm:max-w-[300px] rounded "
                    alt=""
                  />
                </div>
                <p className="text-white p-1  absolute bottom-[10px] right-[10px] text-base font-semibold">
                  {typeDetails
                    ? typeDetails === "movie"
                      ? (movie as Movie).title
                      : (movie as Tv).name
                    : movie.media_type === "movie"
                    ? (movie as Movie).title
                    : (movie as Tv).name}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default CardsList;
