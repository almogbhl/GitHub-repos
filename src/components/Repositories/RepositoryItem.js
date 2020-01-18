import React from "react";
import styled from "styled-components";
import uuidv1 from "uuid/v1";

const RepositoryItem = ({ repository, contributors }) => {
  const printAvatars = () => {
    if (contributors) {
      return contributors[repository.name].map(contributor => (
        <AvatarImage
          key={uuidv1()}
          alt={`Avatar name: ${contributor.alt}`}
          src={contributor.src}
        />
      ));
    }
  };
  return (
    <Item
      data-aos="fade-up"
      data-aos-offset="-350"
      data-aos-delay="20"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      <TitleBox>{repository.name}</TitleBox>

      <AvatarsBox>{printAvatars()}</AvatarsBox>
    </Item>
  );
};

export default RepositoryItem;

const Item = styled.li`
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
  align-items: center;
  border: 1px solid lightgray;
  margin-top: 1rem;
  box-shadow: 0 1px 4px rgba(41, 51, 57, 0.5);

  @media (max-width: 750px) {
    flex-wrap: wrap;
    padding: 1.5rem;
  }
`;
const TitleBox = styled.div`
  @media (max-width: 750px) {
    flex-basis: 100%;
    margin-bottom: 1rem;
  }
`;
const AvatarsBox = styled.div`
  height: 100%;

  @media (max-width: 750px) {
    flex-basis: 100%;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
  }
`;
const AvatarImage = styled.img`
  height: 100%;
  border-radius: 50%;
  margin: 0.5rem;
  height: 50px;

  @media (max-width: 920px) {
    height: 40px;
  }
  @media (max-width: 870px) {
    height: 35px;
  }
  @media (max-width: 800px) {
    height: 30px;
  }
`;
