import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./style.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import { useSelector } from "react-redux";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  let { query } = useSelector((state) => state.home);
  console.log(query);
  useEffect(() => {
    const fetchInitialData = () => {
      setLoading(true);
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
        (res) => {
          setData(res);
          setLoading(false);
          setPageNum((prev) => prev + 1);
        }
      );
    };
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data.results, ...res.results],
          });
        } else {
          setData(res);
        }

        setPageNum((prev) => prev + 1);
      }
    );
  };

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}

      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                Search {data?.total_results > 1 ? "results " : "result "}
                of {query}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, results not found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
