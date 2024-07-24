import Hero from "./Hero";
import CardsList from "../../components/CardsList";
import useCategory from "../../hooks/useCategory";
import useTrending from "../../hooks/useTrending";

const Home = () => {
  const { data: nowPlaying, loading: nowLoading } = useCategory(
    "movie",
    "now_playing"
  );
  const { data: upMovies, loading: upcLoading } = useCategory(
    "movie",
    "upcoming"
  );
  const { data: tvSeries, loading: tvLoading } = useCategory(
    "tv",
    "airing_today"
  );
  const { data: trending, loading: trendLoading } = useTrending("all", "week");

  return (
    <>
      <Hero />
      <div className="mt-12 space-y-12 container pe-0">
        <CardsList
          data={trending}
          loading={trendLoading}
          title="Trending Now"
        />
        <CardsList
          typeDetails="movie"
          data={nowPlaying}
          loading={nowLoading}
          title="Now Playing"
        />
        <CardsList
          typeDetails="movie"
          data={upMovies}
          loading={upcLoading}
          title="Upcoming"
        />
        <CardsList
          typeDetails="tv"
          data={tvSeries}
          loading={tvLoading}
          title="Only on Netflix"
        />
      </div>
      
    </>
  );
};

export default Home;
