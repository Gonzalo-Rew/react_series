import React, { Component } from "react";
import SeriesService from "../services/SeriesService";
import { NavLink } from "react-router-dom";

export default class PersonajesComponent extends Component {
  seriesService = new SeriesService();

  state = {
    personajes: [],
    isLoading: true,
  };

  loadPersonajes = async () => {
    var response = await this.seriesService.getPersonajesBySerieId(
      this.props.id,
    );
    this.setState({
      personajes: response.data,
      isLoading: false,
    });
  };

  componentDidMount() {
    this.loadPersonajes();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.loadPersonajes();
    }
  }

  render() {
    if (this.state.isLoading) {
      return <div className="rounded-lg bg-white p-6 text-slate-600 shadow-sm">Cargando personajes...</div>;
    } else if (this.state.personajes.length === 0) {
      return <div className="rounded-lg bg-white p-6 text-slate-600 shadow-sm">No hay personajes disponibles para esta serie.</div>;
    } else {
      return (
        <div className="space-y-5">
          <NavLink
            className="inline-block rounded-md bg-slate-200 px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-300"
            to={`/series/${this.props.id}`}
          >
            Volver
          </NavLink>
          <div className="overflow-x-auto rounded-xl bg-white shadow-md">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-100 text-xs uppercase text-slate-700">
              <tr>
                <th className="px-4 py-3">Personaje</th>
                <th className="px-4 py-3">Imagen</th>
              </tr>
            </thead>
            <tbody>
              {this.state.personajes.map((personaje, index) => (
                <tr key={index} className="border-t border-slate-200 transition-colors hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{personaje.nombre}</td>
                  <td className="px-4 py-3">
                    <img
                      src={personaje.imagen}
                      alt={personaje.nombre}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      );
    }
  }
}
