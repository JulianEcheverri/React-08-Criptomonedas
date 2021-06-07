import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import Error from "./Error"
import axios from "axios";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {
  // State del listado de criptomonedas
  const [listacripto, guardarCriptomonedas] = useState([]);
  const [error, guardarError] = useState(false);

  // Ejecutar llamado a la API
  useEffect(() => {
    const criptomonedasRequest = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const response = await axios.get(url);
      guardarCriptomonedas(response.data.Data);
      // console.log(listacripto);
    };
    criptomonedasRequest();
  }, []);

  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "COP", nombre: "Peso Colombiano" },
    { codigo: "MXN", nombre: "Peso mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra esterlina" },
  ];

  // Utilizar el custom hook
  // Se le pasan valores al hook
  // Se le pasa el mensaje del label, la moneda seleccionada, el array de monedas
  const [moneda, SelectMoneda] = useMoneda("Elige tu moneda", "", MONEDAS);

  // Hook de criptomoneda
  const [criptomoneda, SelectCriptomoneda] = useCriptomoneda(
    "Elige tu criptomoneda",
    "",
    listacripto
  );

  const cotizarMoneda = (e) => {
    e.preventDefault();
    if (moneda.trim() === "" || criptomoneda.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);
    // Pasar datos al componente principal
    // El componente padre App.js contiene dos states
    // Donde le pasan a este comentente la funcion que lo modifica para asi tener el valor en el componetne principal
    guardarMoneda(moneda);
    guardarCriptomoneda(criptomoneda);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje = "Todos los campos son obligatorios"  /> : null}
      <SelectMoneda />
      <SelectCriptomoneda />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
