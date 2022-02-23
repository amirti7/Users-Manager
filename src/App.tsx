import Header from "./components/Header";
import Users from "./components/Users";
import EditModal from "./components/EditModal";
import AddModal from "./components/AddModal";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 2px solid steelblue;
  padding: 30px;
  border-radius: 5px;
  display: grid;
  position: relative;
`;

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

export interface user {
  name: Name;
  email: string;
  picture: Picture;
  location: Location;
  id: Id;
}

export interface Id {
  value: string;
}

export interface Picture {
  medium: string;
}

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Location {
  country: string;
  city: string;
  street: Street;
}
export interface Street {
  name: string;
  number: number;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<user[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>();
  const [selectedUser, setSelectedUser] = useState<user>();
  const [titleValue, setTitleValue] = useState<string>();
  const [firstValue, setFirstValue] = useState<string>();
  const [lastValue, setLastValue] = useState<string>();
  const [emailValue, setEmailValue] = useState<string>();
  const [countryValue, setCountryValue] = useState<string>();
  const [cityValue, setCityValue] = useState<string>();
  const [streetNameValue, setStreetNameValue] = useState<string>();
  const [mediumPictureValue, setMediumPictureValue] = useState<string>();
  const [idValue, setIdValue] = useState<string>();
  const [streetNumberValue, setStreetNumberValue] = useState<number>();

  useEffect(() => {
    async function getUsers() {
      const usersFromServer: user[] = await fetchUsers();
      setUsers(usersFromServer);
    }
    getUsers();
  }, []);

  //fetch data
  const fetchUsers = async () => {
    const res = await fetch("https://randomuser.me/api/?results=10");
    const data = await res.json();
    console.log(data.results);
    return data.results;
  };

  //delete user
  function deleteUser(email: string) {
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers([...updatedUsers]);
  }

  function handleSelectUser(email: string) {
    setSelectedUserEmail(email);
    setSelectedUser(users.find((user) => user.email === email));
  }

  function verifyEmail() {
    if (!emailValue?.includes("@")) {
      alert("Not a valid Email address!");
      setEmailValue(undefined);
      return false;
    }
    return true;
  }

  function verifyName() {
    const first = firstValue || selectedUser?.name.first;
    const last = lastValue || selectedUser?.name.last;
    if (!first || first.length < 3 || !last || last.length < 3) {
      alert("Not a valid name!");
      setFirstValue(undefined);
      setLastValue(undefined);
      return false;
    }
    return true;
  }
  //edit user
  function editUser() {
    if (!selectedUser) return;
    const userIndex = users.findIndex(
      (user) => user.email === selectedUserEmail
    );
    //update user
    const userToEdit = users[userIndex];
    userToEdit.name.title = titleValue || selectedUser.name.title;
    if (!verifyName()) return;
    userToEdit.name.first = firstValue || selectedUser.name.first;
    userToEdit.name.last = lastValue || selectedUser.name.last;
    if (!verifyEmail()) return;
    userToEdit.email = emailValue || selectedUser.email;
    userToEdit.location.country = countryValue || selectedUser.location.country;
    userToEdit.location.city = cityValue || selectedUser.location.city;
    userToEdit.location.street.name =
      streetNameValue || selectedUser.location.street.name;
    userToEdit.location.street.number =
      streetNumberValue || selectedUser.location.street.number;
    //update users
    const updatedUsers = [...users];
    updatedUsers.splice(userIndex, 1, userToEdit);
    setUsers(updatedUsers);
    setModalIsOpen(false);
    setTitleValue(userToEdit.name.title);
    setFirstValue(userToEdit.name.first);
    setLastValue(userToEdit.name.last);
    setEmailValue(userToEdit.email);
    setCountryValue(userToEdit.location.country);
    setCityValue(userToEdit.location.city);
    setStreetNameValue(userToEdit.location.street.name);
    setStreetNumberValue(userToEdit.location.street.number);
  }

  //clear fields
  function clear() {
    setTitleValue("");
    setFirstValue("");
    setLastValue("");
    setEmailValue("");
    setCountryValue("");
    setCityValue("");
    setStreetNameValue("");
    setStreetNumberValue(0);
    setMediumPictureValue("");
    setIdValue("");
    setAddModalIsOpen(false);
  }

  function onClickAddUser(isOpen: boolean) {
    setAddModalIsOpen(isOpen);
  }
  //add user
  function addUser() {
    if (
      !titleValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !idValue ||
      !mediumPictureValue ||
      !countryValue ||
      !cityValue ||
      !streetNameValue ||
      !streetNumberValue
    ) {
      alert("not a valid User!");
      clear();
      return;
    }

    const updatedUsers = [...users];
    const newUser: user = {
      name: {
        title: titleValue,
        first: firstValue,
        last: lastValue,
      },
      email: emailValue,
      id: { value: idValue },
      picture: { medium: mediumPictureValue },
      location: {
        country: countryValue,
        city: cityValue,
        street: {
          name: streetNameValue,
          number: streetNumberValue,
        },
      },
    };
    updatedUsers.push(newUser);
    setUsers(updatedUsers);
    clear();
  }

  const NO_USERS_TO_DISPLAY = users.length > 0;
  return (
    <Container>
      <Header titlePhrase="Users Library" />
      <Button onClick={() => onClickAddUser(!modalIsOpen)} className="btn_1">
        Add User
      </Button>
      {NO_USERS_TO_DISPLAY ? (
        <Users
          users={users}
          deleteUser={deleteUser}
          handleSelectUser={handleSelectUser}
          modal={modalIsOpen}
          onOpenModal={setModalIsOpen}
        />
      ) : (
        "No Users To Display"
      )}
      <EditModal
        user={selectedUser}
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
        editUser={editUser}
        setTitleValue={setTitleValue}
        titleValue={titleValue}
        setFirstValue={setFirstValue} 
        firstValue={firstValue}
        setLastValue={setLastValue}
        lastValue={lastValue}
        setEmailValue={setEmailValue}
        emailValue={emailValue}
        setCountryValue={setCountryValue}
        countryValue={countryValue}
        setCityValue={setCityValue}
        cityValue={cityValue}
        setStreetNameValue={setStreetNameValue}
        streetNameValue={streetNameValue}
        setStreetNumberValue={setStreetNumberValue}
        streetNumberValue={streetNumberValue}
      ></EditModal>

      <AddModal
        setAddModalIsOpen={setAddModalIsOpen}
        addModalIsOpen={addModalIsOpen}
        addUser={addUser}
        setTitleValue={setTitleValue}
        titleValue={titleValue}
        setFirstValue={setFirstValue}
        firstValue={firstValue}
        setLastValue={setLastValue}
        lastValue={lastValue}
        setEmailValue={setEmailValue}
        emailValue={emailValue}
        setCountryValue={setCountryValue}
        countryValue={countryValue}
        setCityValue={setCityValue}
        cityValue={cityValue}
        setStreetNameValue={setStreetNameValue}
        streetNameValue={streetNameValue}
        setStreetNumberValue={setStreetNumberValue}
        streetNumberValue={streetNumberValue}
        setMediumPictureValue={setMediumPictureValue}
        mediumPictureValue={mediumPictureValue}
        setIdValue={setIdValue}
        idValue={idValue}
      ></AddModal>
    </Container>
  );
};

export default App;
