import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Item from "./RepositoryItem";
import BubbleLoader from "../../utils/BubbleLoader/BubbleLoader";
import uuidv1 from "uuid/v1";

const RepositoriesList = props => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);

  // handle errors
  //--------------
  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  // // handle loading
  // //--------------
  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  // // handle data
  // //--------------

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  // print list
  //--------------------
  const printList = () => {
    if (error) return <ErrMsg>{error}</ErrMsg>;
    if (loading) return <BubbleLoader />;

    if (data && data.repos_list)
      return data.repos_list.map(repository => (
        <Item
          key={uuidv1()}
          repository={repository}
          contributors={data.contributors_list}
        />
      ));
  };

  return <List>{printList()}</List>;
};

export default RepositoriesList;

const ErrMsg = styled.h1`
  margin: 0 auto;
  margin-top: 10%;
  color: tomato;
`;

const List = styled.ul`
  border-radius: 0.4rem;
  padding: 0;
`;
