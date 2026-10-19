import React, { Component } from "react";
import SeriesService from "../services/SeriesService";
import PersonajesService from "../services/PersonajesService";
import { Navigate } from "react-router-dom";

export default class ModificarPersonaje extends Component {
  SeriesService = new SeriesService();
  PersonajesService = new PersonajesService();

  inputSerie = React.createRef();
  inputPersonaje = React.createRef();

  state = {
    series: [],
    personajes: [],
    serieSeleccionada: null,
    personajeSeleccionado: null,
    isLoading: true,
    isSubmited: false,
  };

  loadSeries = async () => {
    const series = await this.SeriesService.getSeries();
    this.setState({ series: series.data });
  };

  loadPersonajes = async () => {
    const personajes = await this.PersonajesService.getPersonajes();
    this.setState({ personajes: personajes.data });
  };

  handleChangePersonaje = (event) => {
    const selectedPersonajeId = parseInt(event.target.value);
    const selectedPersonaje = this.state.personajes.find(
      (personaje) => personaje.idPersonaje === selectedPersonajeId,
    );
    this.setState({ personajeSeleccionado: selectedPersonaje });
  };

  handleChangeSerie = (event) => {
    const selectedSerieId = parseInt(event.target.value);
    const selectedSerie = this.state.series.find(
      (serie) => serie.idSerie === selectedSerieId,
    );
    this.setState({ serieSeleccionada: selectedSerie });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.PersonajesService.putPersonaje(
      parseInt(this.state.personajeSeleccionado.idPersonaje),
      parseInt(this.state.serieSeleccionada.idSerie),
    );
    this.setState({ isSubmited: true });
  };

  componentDidMount() {
    this.loadSeries();
    this.loadPersonajes();
    this.setState({ isLoading: false });
  }

  render() {
    if (this.state.isSubmited) {
      return <Navigate to={`/personajes/${this.state.serieSeleccionada.idSerie}`} />;
    } else if (this.state.isLoading) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div>
          <h1>Personajes y series</h1>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="serie">Seleccione una serie:</label>
            <select
              id="serie"
              value={this.state.serieSeleccionada?.idSerie || ""}
              onChange={this.handleChangeSerie}
              name="serie"
              ref={this.inputSerie}
              required
            >
              <option value="">Seleccione una serie</option>
              {this.state.series.map((serie, index) => (
                <option key={index} value={serie.idSerie}>
                  {serie.nombre}
                </option>
              ))}
            </select>
            <label htmlFor="personaje">Seleccione un personaje:</label>
            <select
              id="personaje"
              value={this.state.personajeSeleccionado?.idPersonaje || ""}
              onChange={this.handleChangePersonaje}
              name="personaje"
              ref={this.inputPersonaje}
              required
            >
              <option value="">Seleccione un personaje</option>
              {this.state.personajes.map((personaje, index) => (
                <option
                  key={index}
                  ref={this.inputPersonaje}
                  value={personaje.idPersonaje}
                >
                  {personaje.nombre}
                </option>
              ))}
            </select>
            <button type="submit">Guardar Cambios</button>
          </form>

          {this.state.serieSeleccionada && (
            <div>
              <h2>{this.state.serieSeleccionada.nombre}</h2>
              <img
                src={this.state.serieSeleccionada.imagen}
                alt={this.state.serieSeleccionada.nombre}
              />
            </div>
          )}
          {this.state.personajeSeleccionado && (
            <div>
              <h2>{this.state.personajeSeleccionado.nombre}</h2>
              <img
                src={this.state.personajeSeleccionado.imagen}
                alt={this.state.personajeSeleccionado.nombre}
              />
            </div>
          )}
        </div>
      );
    }
  }
}
