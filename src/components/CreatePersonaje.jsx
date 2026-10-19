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
      <div className="space-y-6 rounded-xl bg-white p-6 shadow-md">
        <h1 className="text-3xl font-bold text-slate-800">Nuevo Personaje</h1>

        <form className="space-y-4" onSubmit={this.handleSubmit}>
          <label className="block font-medium text-slate-700" htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            ref={this.inputNombre}
            required
            id="nombre"
            name="nombre"
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <label className="block font-medium text-slate-700" htmlFor="imagen">Imagen:</label>
          <input
            type="text"
            ref={this.inputImagen}
            required
            id="imagen"
            name="imagen"
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <label className="block font-medium text-slate-700" htmlFor="serie">Serie:</label>
          <select
            id="serie"
            ref={this.inputSerie}
            name="serie"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            {this.state.series.map((serie, index) => (
              <option key={index} value={serie.idSerie}>
                {serie.nombre}
              </option>
            ))}
          </select>

          <button
            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            type="submit"
          >
            Insertar Personaje
          </button>
        </form>
      </div>
    );
  }
}
