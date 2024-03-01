import "./App.css";
import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";

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
      App
      {/* ? is optional chaining i.e. if there is any delay in API call results then prog will wait*/}
      {url?.total_pages}
    </div>
  );
}

export default App;
