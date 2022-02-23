import User from "./User";
import { user } from "../App";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;

interface props {
  users: user[];
  deleteUser: (email: string) => void;
  handleSelectUser: (email: string) => void;
  onOpenModal:(modal:boolean)=>void;
  modal:boolean;
}

interface PropsFunction {}

const Users: React.FC<props> = ({ users, deleteUser ,handleSelectUser,modal,onOpenModal }) => {
  return (
    <Container>
      {users.map((user) => (
        <User
          user={user}
          deleteUser={deleteUser}
          handleSelectUser={handleSelectUser}
          onOpenModal={onOpenModal}
          modal={modal}
        />
      ))}
    </Container>
  );
};

export default Users;
