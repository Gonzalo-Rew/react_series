import React, { Component } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import MenuComponent from "./MenuComponent";
import HomeComponent from "./HomeComponent";
import SeriesComponent from "./SeriesComponent";
import PersonajesComponent from "./PersonajesComponent";
import CreatePersonaje from "./CreatePersonaje";
import ModificarPersonaje from "./ModificarPersonaje";

export default class Router extends Component {
  render() {
    function SeriesElement() {
      const { id } = useParams();
      return <SeriesComponent id={id} />;
    }
    function PersonajesElement() {
      const { id } = useParams();
      return <PersonajesComponent id={id} />;
    }
    return (
      <BrowserRouter>
        <MenuComponent />
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/home/" element={<HomeComponent />} />
            <Route path="/series/:id" element={<SeriesElement />} />
            <Route path="/personajes/:id" element={<PersonajesElement />} />
            <Route path="/crear-personaje/" element={<CreatePersonaje />} />
            <Route path="/modificar-personaje/" element={<ModificarPersonaje />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}
