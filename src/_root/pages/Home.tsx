import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { ImageOnFeed } from "@/types";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const [feed, setFeed] = useState<ImageOnFeed[]>([]);
  const axios = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('api/image/feed');
        console.log(response.data);
        setFeed(response.data);
      } catch (error) {
        console.log('Error fetching feed', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      {feed.length > 0 && feed.map((image, index) => (
        <img key={index} src={image?.cloudinary_url} alt="image" />
      ))}
    </div>
  );

  // return <div>Home</div>;
}

export default Home;
