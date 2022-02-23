import Modal from "react-modal";
import styled from "styled-components";

const Container = styled.div`
    display: flex,
    flexDirection: column,
    textAlign: center,
    width: 50%,
    margin: auto,
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

const Title = styled.h2`
  text-align: center;
`;

const AddModalSection = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
`;

interface props {
  addModalIsOpen: boolean;
  setAddModalIsOpen: (open: boolean) => void;
  addUser: () => void;
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
  setMediumPictureValue: (pic: string) => void;
  mediumPictureValue?: string;
  setIdValue: (id: string) => void;
  idValue?: string;
}

const AddModal: React.FC<props> = ({
  addModalIsOpen,
  setAddModalIsOpen,
  addUser,
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
  setMediumPictureValue,
  mediumPictureValue,
  setIdValue,
  idValue,
}) => {
  function onCloseModal() {
    setAddModalIsOpen(false);
    setTitleValue("");
    setFirstValue("");
    setLastValue("");
    setCountryValue("");
    setCityValue("");
    setStreetNameValue("");
    setStreetNumberValue(0);
    setMediumPictureValue("");
    setIdValue("");
  }
  return (
    <Modal isOpen={addModalIsOpen} shouldCloseOnOverlayClick={false}>
      <Container>
        <Title>Add User</Title>
        <AddModalSection>
          <label> Title: </label>
          <input
            onChange={(e) => setTitleValue(e.target.value)}
            type="text"
            id="nameTitle"
            value={titleValue}
          ></input>
          <label> First Name: </label>
          <input
            onChange={(e) => setFirstValue(e.target.value)}
            type="text"
            id="nameFirst"
            value={firstValue}
          ></input>
          <label> Last Name: </label>
          <input
            onChange={(e) => setLastValue(e.target.value)}
            type="text"
            id="nameLast"
            value={lastValue}
          ></input>
        </AddModalSection>
        <AddModalSection>
          <label> Email: </label>
          <input
            onChange={(e) => setEmailValue(e.target.value)}
            type="text"
            id="email"
            value={emailValue}
          ></input>
        </AddModalSection>
        <AddModalSection>
          <label> Country: </label>
          <input
            onChange={(e) => setCountryValue(e.target.value)}
            type="text"
            id="dountry"
            value={countryValue}
          ></input>
          <label> City: </label>
          <input
            onChange={(e) => setCityValue(e.target.value)}
            type="text"
            id="city"
            value={cityValue}
          ></input>
          <label> Street name: </label>
          <input
            onChange={(e) => setStreetNameValue(e.target.value)}
            type="text"
            id="streetName"
            value={streetNameValue}
          ></input>
          <label> Street number: </label>
          <input
            onChange={(e) => setStreetNumberValue(parseInt(e.target.value))}
            type="text"
            id="streetName"
            value={streetNumberValue}
          ></input>
        </AddModalSection>
        <AddModalSection>
          <label> Picture URL: </label>
          <input
            onChange={(e) => setMediumPictureValue(e.target.value)}
            type="text"
            id="pic"
            value={mediumPictureValue}
          ></input>
        </AddModalSection>
        <AddModalSection>
          <label> ID: </label>
          <input
            onChange={(e) => setIdValue(e.target.value)}
            type="text"
            id="id"
            value={idValue}
          ></input>
        </AddModalSection>
        <Button onClick={() => addUser()}>Add User</Button>
        <Button onClick={() => onCloseModal()}>Close</Button>
      </Container>
    </Modal>
  );
};

export default AddModal;
