import { FaPlay } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import CardsList from "../../components/CardsList";
import useCategory from "../../hooks/useCategory";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect, useState } from "react";
import { Movie } from "../../types/movieType";
import { Tv } from "../../types/tvType";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate=useNavigate()
  const { data, loading } = useCategory("movie", "popular");
  const [selectedMovie, setSelectedMovie] = useState<Movie | Tv | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (data?.length) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setSelectedMovie(data[randomIndex]);
      }
    }, 0);
    const interval = setInterval(() => {
      if (data?.length) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setSelectedMovie(data[randomIndex]);
      }
    }, 10000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [data]);

  return (
    <div className="h-screen relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-l  before:from-transparent before:to-black before:content-['']">
      <AnimatePresence mode="popLayout" initial={false}>
        {selectedMovie && (
          <motion.div
            key={selectedMovie?.id}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full z-[-1] "
          >
            <motion.img
              className="object-cover w-full h-full"
              src={`https://image.tmdb.org/t/p/original/${selectedMovie?.backdrop_path}`}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="container pe-0">
        <div className="min-h-screen relative w-full">
          <div className="absolute bottom-0 w-full">
            <div>
              <AnimatePresence mode="sync">
                {selectedMovie && (
                  <motion.h1
                    key={selectedMovie?.id}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0, y: 100 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: 0.3,
                    }}
                    className="text-5xl max-sm:text-xl font-bold text-white"
                  >
                    {(selectedMovie as Movie)?.title}
                  </motion.h1>
                )}
              </AnimatePresence>
              <AnimatePresence mode="popLayout">
                {selectedMovie && (
                  <motion.p
                    key={selectedMovie?.id}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0, y: 100, scale: 0.8 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: 0.4,
                    }}
                    className="text-white mt-6 max-sm:mt-2 max-w-[700px] text-sm max-sm:text-xs max-sm:leading-4 leading-6 font-semibold"
                  >
                    {(selectedMovie as Movie)?.overview}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="flex gap-4 max-sm:my-4 my-10">
                <button onClick={()=>navigate(`/movie/${selectedMovie?.id}`)} className="bg-white text-black px-5 py-2 transition-colors hover:bg-[#ffffffbf] rounded flex items-center gap-3 text-base">
                  <FaPlay />
                  <span>Play</span>
                </button>
                <button className="bg-[#6d6d6eb3] text-white px-5 py-2 transition-colors hover:bg-[#6d6d6e66] rounded flex items-center text-base  gap-3">
                  <MdInfoOutline className="text-2xl" />
                  <span>Info</span>
                </button>
              </div>
            </div>
            <CardsList
              typeDetails="movie"
              data={data}
              loading={loading}
              title="New & Popular"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
