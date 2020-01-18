import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import api from "../../utils/api/api";
import axios from "axios";
import { debounce } from "lodash";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    "& > *": {
      width: "100%"
    }
  }
}));

const SearchInput = props => {
  const classes = useStyles();

  const updateValue = debounce(val => {
    if (val.length) return fetchUserRepositories(val);

    return props.handleData({ contributors_list: null, repos_list: null });
  }, 1000);

  const fetchUserRepositories = async userName => {
    try {
      props.handleLoading(true);

      const helper = {};
      const REPO_URL = api.repositories(userName);

      const repos_response = await axios.get(REPO_URL);
      const repos_list = repos_response.data;

      if (!repos_list.length) {
        props.handleData({ contributors_list: null, repos_list: null });
        props.handleLoading(false);
        return props.handleErrors(`no repositories found, please try again`);
      }

      const contributors_requests = repos_list.map(repo => {
        const CONTRIBUTORS_URL = api.contributors(userName, repo.name);
        helper[CONTRIBUTORS_URL] = repo.name;
        return axios.get(CONTRIBUTORS_URL);
      });

      await Promise.all(contributors_requests)
        .then(values => {
          const contributors_list = {};

          for (let key in values) {
            const name = helper[values[key].config.url];
            const data = values[key].data.map(el => ({
              alt: el.login,
              src: el.avatar_url
            }));
            contributors_list[name] = data;
          }

          props.handleData({ contributors_list, repos_list });
          props.handleLoading(false);
          props.handleErrors('');
        })
        .catch(err => {
          console.log(err);
          // return err;
        });
    } catch (error) {
      if (error === "Request failed with status code 404") {
        props.handleErrors(`${userName} not found, please try again`);
      } else {
        props.handleErrors(`Opps... ${error}, please try again`);
      }

      props.handleLoading(false);
    }
  };

  return (
    <Box data-aos="fade-right" data-aos-duration="2000">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="User"
          onChange={e => updateValue(e.target.value)}
        />
      </form>
    </Box>
  );
};

export default SearchInput;

const Box = styled.div`
  width: 100%;
`;
