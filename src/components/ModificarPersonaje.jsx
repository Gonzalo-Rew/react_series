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
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-slate-800">Personajes y series</h1>
          <form className="space-y-4 rounded-xl bg-white p-6 shadow-md" onSubmit={this.handleSubmit}>
            <label className="block font-medium text-slate-700" htmlFor="serie">Seleccione una serie:</label>
            <select
              id="serie"
              value={this.state.serieSeleccionada?.idSerie || ""}
              onChange={this.handleChangeSerie}
              name="serie"
              ref={this.inputSerie}
              required
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Seleccione una serie</option>
              {this.state.series.map((serie, index) => (
                <option key={index} value={serie.idSerie}>
                  {serie.nombre}
                </option>
              ))}
            </select>
            <label className="block font-medium text-slate-700" htmlFor="personaje">Seleccione un personaje:</label>
            <select
              id="personaje"
              value={this.state.personajeSeleccionado?.idPersonaje || ""}
              onChange={this.handleChangePersonaje}
              name="personaje"
              ref={this.inputPersonaje}
              required
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
            <button
              className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
              type="submit"
            >
              Guardar Cambios
            </button>
          </form>

          {this.state.serieSeleccionada && (
            <div className="space-y-3 rounded-xl bg-white p-6 shadow-md">
              <h2 className="text-2xl font-bold text-slate-800">{this.state.serieSeleccionada.nombre}</h2>
              <img
                src={this.state.serieSeleccionada.imagen}
                alt={this.state.serieSeleccionada.nombre}
                className="max-h-72 w-full rounded-lg object-cover"
              />
            </div>
          )}
          {this.state.personajeSeleccionado && (
            <div className="space-y-3 rounded-xl bg-white p-6 shadow-md">
              <h2 className="text-2xl font-bold text-slate-800">{this.state.personajeSeleccionado.nombre}</h2>
              <img
                src={this.state.personajeSeleccionado.imagen}
                alt={this.state.personajeSeleccionado.nombre}
                className="max-h-72 w-full rounded-lg object-cover"
              />
            </div>
          )}
        </div>
      );
    }
  }
}
