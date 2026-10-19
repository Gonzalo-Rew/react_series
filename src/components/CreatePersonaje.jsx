import React, { Component } from "react";
import PersonajesService from "../services/PersonajesService";
import SeriesService from "../services/SeriesService";
import { Navigate } from "react-router-dom";

export default class CreatePersonaje extends Component {
  personajesService = new PersonajesService();
  seriesService = new SeriesService();
  inputNombre = React.createRef();
  inputImagen = React.createRef();
  inputSerie = React.createRef();

  state = {
    series: [],
    personajeInserted: false,
    idSerie: 0,
  };

  loadSeries = async () => {
    var response = await this.seriesService.getSeries();
    this.setState({
      series: response.data,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    var personaje = {};
    personaje = {
      idPersonaje: 1,
      nombre: this.inputNombre.current.value,
      imagen: this.inputImagen.current.value,
      idSerie: parseInt(this.inputSerie.current.value),
    };
    await this.personajesService.postPersonaje(personaje);
    this.setState({
      idSerie: personaje.idSerie,
      personajeInserted: true,
    });
  };

  componentDidMount() {
    this.loadSeries();
  }

  render() {
    if (this.state.personajeInserted) {
      return <Navigate to={`/personajes/${this.state.idSerie}`} />;
    }
    return (
      <div>
        <h1>Nuevo Personaje</h1>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            ref={this.inputNombre}
            required
            id="nombre"
            name="nombre"
          />
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="text"
            ref={this.inputImagen}
            required
            id="imagen"
            name="imagen"
          />
          <label htmlFor="serie">Serie:</label>
          <select id="serie" ref={this.inputSerie} name="serie">
            {this.state.series.map((serie, index) => (
              <option key={index} value={serie.idSerie}>
                {serie.nombre}
              </option>
            ))}
          </select>

          <button type="submit">Insertar Personaje</button>
        </form>
      </div>
    );
  }
}
