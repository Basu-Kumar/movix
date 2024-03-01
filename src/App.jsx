// import "./App.css";
import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import Details from "./pages/details/Details";
import PageNotFound from "./pages/404/PageNotFound";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  const dispatch = useDispatch();

  // the (state) contains all the states of homeSLice(here url and genres)
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    const apiTesting = () => {
      fetchDataFromApi("/movie/popular").then((res) => {
        console.log(res);
        dispatch(getApiConfiguration(res));
      });
    };

    apiTesting();
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:querry" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
