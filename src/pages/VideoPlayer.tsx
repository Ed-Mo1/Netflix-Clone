import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
interface VideoPreview {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

const VideoPlayer = () => {
  const { id, meidaType } = useParams();
  const [video, setVideo] = useState<VideoPreview>();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWQxMjlhYWEzODhjYWNkOGU0OWU2MmE3MDZmMGIzZSIsIm5iZiI6MTcyMTEyOTY1Mi43NzE4NzEsInN1YiI6IjY2MGYyOTQ4ZDZkYmJhMDE2MzcxMzBiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H-nUYGa_7TJJaqkO3ZDQtLDMLd3W73jH-bij5bB8liI",
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${meidaType}/${id}/videos?language=en-US`,
        options
      );
      const data = await response.json();
      console.log(data);

      setVideo(data.results[0]);
    };
    fetchData();
  }, [id, meidaType]);

  return (
    <div className="h-screen relative">
      <ReactPlayer
        width={"100%"}
        height={"100%"}
        playing={true}
        controls={true}
        light={true}
        url={`https://www.youtube.com/watch?v=${video?.key}`}
      />
    </div>
  );
};

export default VideoPlayer;
