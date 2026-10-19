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
      return <div>Cargando personajes...</div>;
    } else if (this.state.personajes.length === 0) {
      return <div>No hay personajes disponibles para esta serie.</div>;
    } else {
      return (
        <div>
          <NavLink to={`/series/${this.props.id}`}>Volver</NavLink>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Personaje</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
              {this.state.personajes.map((personaje, index) => (
                <tr key={index}>
                  <td>{personaje.nombre}</td>
                  <td>
                    <img
                      src={personaje.imagen}
                      alt={personaje.nombre}
                      className="img-fluid"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
