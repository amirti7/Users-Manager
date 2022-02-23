import { user } from "../App";
import Modal from "react-modal";
import styled from "styled-components";

const Container = styled.div`
    display: flex,
    flexDirection: column,
    textAlign: center,
    width: 50%,
    margin: auto,
`;

const EditModalSection = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Title = styled.h2`
  text-align: center;
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

interface props {
  user?: user;
  modalIsOpen: boolean;
  setModalIsOpen: (open: boolean) => void;
  editUser: () => void;
  setTitleValue: (title: string) => void;
  titleValue?: string;
  setFirstValue: (first: string) => void;
  firstValue?: string;
  setLastValue: (last: string) => void;
  lastValue?: string;
  setEmailValue: (email: string) => void;
  emailValue?: string;
  setCountryValue: (country: string) => void;
  countryValue?: string;
  setCityValue: (city: string) => void;
  cityValue?: string;
  setStreetNameValue: (name: string) => void;
  streetNameValue?: string;
  setStreetNumberValue: (num: number) => void;
  streetNumberValue?: number;
}

const EditModal: React.FC<props> = ({
  modalIsOpen,
  setModalIsOpen,
  user,
  editUser,
  setTitleValue,
  titleValue,
  setFirstValue,
  firstValue,
  setLastValue,
  lastValue,
  setEmailValue,
  emailValue,
  setCountryValue,
  countryValue,
  setCityValue,
  cityValue,
  setStreetNameValue,
  streetNameValue,
  setStreetNumberValue,
  streetNumberValue,
}) => {
  function onCloseModal() {
    setModalIsOpen(false);
    setTitleValue("");
    setFirstValue("");
    setLastValue("");
    setCountryValue("");
    setCityValue("");
    setStreetNameValue("");
    setStreetNumberValue(0);
  }
  if (!user) return null;
  const { id, email, picture, name, location } = user;
  return (
    <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false}>
      <Container>
        <Title>Edit User</Title>
        <EditModalSection>
          <label>Edit Name: </label>
          <input
            onChange={(e) => setTitleValue(e.target.value)}
            type="text"
            id="nameTitle"
            value={titleValue || name.title}
          ></input>
          <input
            onChange={(e) => setFirstValue(e.target.value)}
            type="text"
            id="nameFirst"
            value={firstValue || name.first}
          ></input>
          <input
            onChange={(e) => setLastValue(e.target.value)}
            type="text"
            id="nameLast"
            value={lastValue || name.last}
          ></input>
        </EditModalSection>
        <EditModalSection>
          <label>Edit Email: </label>
          <input
            onChange={(e) => setEmailValue(e.target.value)}
            type="text"
            id="email"
            value={emailValue || email}
          ></input>
        </EditModalSection>
        <EditModalSection>
          <label>Edit Location: </label>
          <input
            onChange={(e) => setCountryValue(e.target.value)}
            type="text"
            id="dountry"
            value={countryValue || location.country}
          ></input>
          <input
            onChange={(e) => setCityValue(e.target.value)}
            type="text"
            id="city"
            value={cityValue || location.city}
          ></input>
          <input
            onChange={(e) => setStreetNameValue(e.target.value)}
            type="text"
            id="streetName"
            value={streetNameValue || location.street.name}
          ></input>
          <input
            onChange={(e) => setStreetNumberValue(parseInt(e.target.value))}
            type="text"
            id="streetName"
            value={streetNumberValue || location.street.number}
          ></input>
        </EditModalSection>
        <Button onClick={editUser}>Update</Button>
        <Button onClick={onCloseModal}>Close</Button>
      </Container>
    </Modal>
  );
};

export default EditModal;
