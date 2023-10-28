import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api.js";

import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice.js";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./Pages/home/Home";
import Explore from "./Pages/explore/Explore";
import Details from "./Pages/details/Details";
import PageNotFound from "./Pages/404/PageNotFound";

import SearchResult from "./Pages/searchResult/SearchResult";
function App() {
  // to save value in store we call the action using useDispatch() hook
  const dispatch = useDispatch();

  const { url } = useSelector((state) => state.home);
  console.log(url);

  useEffect(() => {
    const fetchAPIConfig = () => {
      fetchDataFromApi("/configuration").then((res) => {
        // console.log(res);
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };
        dispatch(getApiConfiguration(url)); // basically updating the state value of getApiConfiguration with res
      });
    };
    fetchAPIConfig();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
