import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";
import { useState } from "react";
import data from "./Server";

function App() {
  let [shoes] = useState(data);
  console.log(shoes[0]);
  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="main_bg"></div>
      <Container>
        <Row>
          {shoes.map(function (e, i) {
            return <Card data={e} index={i} key={i} />;
          })}
        </Row>
      </Container>
    </div>
  );
}

export default App;

const Card = (props) => {
  console.log("e", props.data, props.index);
  return (
    <Col>
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.index + 1}.jpg`}
        width="80%"
      />
      <h4>{props.data.title}</h4>
      <p>{props.data.price}</p>
      <p>{props.data.content}</p>
    </Col>
  );
};
