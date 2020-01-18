import React, { useEffect, useState } from "react";
import styled from "styled-components";

// utils
import AOS from "aos";
import "aos/dist/aos.css";
import GlobalStyle from "../../style/style.global";

// components
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import List from "../Repositories/RepositoriesList";

const App = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    // animation library
    AOS.init();
  }, []);

  const handleUpdates = (updatdeType, value) => {
    switch (updatdeType) {
      case "error":
        setError(value);
        break;
      case "loading":
        setLoading(value);
        break;
      case "data":
        setData(value);
        break;

      default:
        break;
    }
  };

  return (
    <Container>
      <GlobalStyle />

      <Header />
      <Main>
        <SearchBar
          handleErrors={errorMsg => handleUpdates("error", errorMsg)}
          handleLoading={isLoading => handleUpdates("loading", isLoading)}
          handleData={reposList => handleUpdates("data", reposList)}
        />
        <List error={error} loading={loading} data={data} />
      </Main>
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Main = styled.main`
  padding: 2rem;
`;
