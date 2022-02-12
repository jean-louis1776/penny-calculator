import React from "react";
import { Container } from "react-bootstrap";
import CalcForm from "./CalcForm";

import Header from "./Header";

const Calculator = (props) => {
  return (
    <Container>
      <Header />
      <CalcForm />
    </Container>
  );
};

export default Calculator;
