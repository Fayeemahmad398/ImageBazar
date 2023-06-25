import { FaSistrix } from "react-icons/fa";
import collection from "./collections.webp";
import demoimg from "./demoimg.jpg";
import axios from "axios";
import { useEffect, useState } from "react";

const Section = () => {
  const [images, setImages] = useState([]);
  const [imagesCollections, setCollections] = useState([]);
  const [searchQuery, setsearchQuery] = useState("cats");
  const [helper, setHelper] = useState("");

  let client_id = "0gT2OkQEzOV5PWiValuObj9stjYiDtS_JEqQZLYSbHI";
  let url1 = `https://api.unsplash.com/photos/?client_id=${client_id}`;
  let url2 = `https://api.unsplash.com/search/photos?client_id=${client_id}`;

  // GET /photos/random
  // GET /collections
  // GET /search/photos
  useEffect(() => {
    fetch(url1)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setImages(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [helper]);

  function handleClicked() {
    console.log(searchQuery);
    axios
      .get(url2, {
        params: {
          query: `${searchQuery}`,
          per_page: 30,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        setCollections(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div id="outerBox">
      <div id="search-box">
        <input
          type="text"
          placeholder="Search the best photos here"
          onChange={(event) => {
            setsearchQuery(event.target.value.trim());
          }}
        />
        <div id="btns">
          <button id="search" onClick={handleClicked}>
            Search
          </button>
          <button
            id="reset"
            onClick={() => {
              setHelper(helper + 1);
              setCollections([]);
            }}
          >
            Reset
          </button>
        </div>
        <FaSistrix id="iconreact" />
      </div>

      <img src={collection} id="imgcollection" alt="" />
      <div className="collections">
        {imagesCollections.map((obj) => {
          console.log(obj);
          return <img src={obj.links.download} alt="" className="images2" />;
        })}
      </div>
      <div className="collections">
        {imagesCollections.length == 0 &&
          images.map((obj) => {
            return <img src={obj.links.download} alt="" className="images2" />;
          })}
      </div>
    </div>
  );
};
export default Section;
