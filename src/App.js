// import React, { useEffect, useState } from "react";
// import Navbar from "./components/Navbar/Navbar";
// import { StyledEngineProvider } from "@mui/material";
// import { Outlet } from "react-router-dom";
// import { fetchNewAlbums, fetchSongs, fetchTopAlbums } from "./components/API/API";

// function App() {

//   const [searchData, useSearchData] = useState();
//   const [data, setData] = useState({});

//   const generateData = (key, source) => {
//     source().then(data => {
//       setData((prevData) => {
//         return {...prevData, [key]: data};
//       })
//     })
//   }

//   useEffect(() => {
//     generateData("topAlbums", fetchTopAlbums);
//     generateData("newAlbums", fetchNewAlbums);
//     generateData("songs", fetchSongs);
//   },[]);

//   const {topAlbums = [], newAlbums = [], songs = []} = data;

//   return (
//     <StyledEngineProvider injectFirst>
//       <Navbar searchData={[...topAlbums, ...newAlbums]}/>
//       <Outlet context={{data: {topAlbums, newAlbums, songs}}}/>
//     </StyledEngineProvider>
//   );
// }

// export default App;
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { StyledEngineProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import { fetchNewAlbums, fetchSongs, fetchTopAlbums } from "./components/API/API";

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const generateData = (key, source) => {
    source()
      .then(data => {
        setData(prevData => ({ ...prevData, [key]: data }));
      })
      .catch(error => {
        console.error(`Error fetching ${key}:`, error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    generateData("topAlbums", fetchTopAlbums);
    generateData("newAlbums", fetchNewAlbums);
    generateData("songs", fetchSongs);
  }, []);

  const { topAlbums = [], newAlbums = [], songs = [] } = data || {};

  return (
    <StyledEngineProvider injectFirst>
      <Navbar searchData={[...topAlbums, ...newAlbums]} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Outlet context={{ data: { topAlbums, newAlbums, songs } }} />
      )}
    </StyledEngineProvider>
  );
}

export default App;
