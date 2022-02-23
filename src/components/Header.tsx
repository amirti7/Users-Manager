import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
`;

interface props {
  titlePhrase: string;
}

const Header: React.FC<props> = ({ titlePhrase }) => {
  return (
    <div>
      <Title>{titlePhrase}</Title>
    </div>
  );
};

export default Header; 
