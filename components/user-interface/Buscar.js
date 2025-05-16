import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Router from "next/router";

const InputText = styled.input`
  border: 1px solid var(--gris3);
  padding: 1rem;
  min-width: 300px;
`;

const InputSubmit = styled.button`
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
  height: 3rem;
  width: 3rem;
  padding: 0;
  border: none;
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const Buscar = () => {
  const [busqueda, setBusqueda] = useState("");
  const buscarProducto = (e) => {
    e.preventDefault();

    if (busqueda.trim() === "") return;

    // Redireccionar a /buscar
    Router.push({
      pathname: "/buscar",
      query: { q: busqueda },
    });
  };
  return (
    <form
      css={css`
        position: relative;
        /* display: flex;
        flex-direction: row; */
      `}
      onSubmit={buscarProducto}
    >
      <InputText
        type="text"
        placeholder="Buscar Productos"
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <InputSubmit type="submit">
        <img src="/static/img/buscar.png" alt="Buscar" />
      </InputSubmit>
    </form>
  );
};

export default Buscar;
