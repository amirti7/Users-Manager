import { FaTimes } from "react-icons/fa";
import { user } from "../App";
import styled from "styled-components";

const Button = styled.button`
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
`;

const Container = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  margin: 10px;
  text-align: center;
  background-color: #f1f1f1;
  width: 25%;
  min-width: 300px;
`; 

const Icon = styled(FaTimes)`
  color: red;
  cursor: pointer;
  float: right;
`;

interface props {
  user: user;
  deleteUser: (email: string) => void;
  handleSelectUser: (email: string) => void;
  onOpenModal: (modal: boolean) => void;
  modal: boolean;
}

const User: React.FC<props> = ({
  user,
  deleteUser,
  handleSelectUser,
  modal,
  onOpenModal,
}) => {
  const { id, email, picture, name, location } = user;
  function onClickEditUser() {
    onOpenModal(!modal);
    handleSelectUser(user.email);
  }
  return (
    <Container>
      <h3>
        {name.title} {name.first} {name.last}
        <Icon onClick={() => deleteUser(email)} />
      </h3>
      <p>{email}</p>
      <img src={picture.medium}></img>
      <p>
        {location.city}, {location.country} ,{location.street.name}{" "}
        {location.street.number}
      </p>
      <p>{id.value}</p>
      <Button onClick={() => onClickEditUser()}>Edit</Button>
    </Container>
  );
};

export default User;
