// Hook personalizado
// Seguir la convencion de que cada hook contenga la palabra "use" como prefijo en su nombre
// Un hook es una funcion que nos sirve de utilidad
import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

const useMoneda = (label, stateInicial, opciones) => {
  // State del custom hook
  const [state, actualizarState] = useState(stateInicial);

  const SelectElement = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select onChange={(e) => actualizarState(e.target.value)} value={state}>
        <option value="">--SELECCIONE--</option>
        {opciones.map((opcion) => (
          <option key={opcion.codigo} value={opcion.codigo}>
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </Fragment>
  );

  // Retornar state, interfaz y funcion que modifica el state
  return [state, SelectElement, actualizarState];
};

export default useMoneda;
