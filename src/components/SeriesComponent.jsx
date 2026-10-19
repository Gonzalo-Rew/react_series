import React, { Component } from "react";
import SeriesService from "../services/SeriesService";
import { NavLink } from "react-router-dom";

export default class SeriesComponent extends Component {
  seriesService = new SeriesService();

  state = {
    serie: null,
    isLoading: true,
  };

  loadSerie = async () => {
    var response = await this.seriesService.getSerieById(this.props.id);
    this.setState({
      serie: response.data,
      isLoading: false,
    });
  };

  componentDidMount() {
    this.loadSerie();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.loadSerie();
    }
  }

  render() {
    if (this.state.isLoading) {
      return <div>Cargando serie...</div>;
    } else if (!this.state.serie) {
      return <div>No se encontró la serie.</div>;
    } else {
      return (
        <div>
          <img src={this.state.serie?.imagen} alt={this.state.serie?.name} />
          <h3>{this.state.serie?.nombre}</h3>
          <p>IMDB: {this.state.serie?.puntuacion}</p>
          <NavLink to={"/personajes/" + this.state.serie?.idSerie}>
            Personajes
          </NavLink>
        </div>
      );
    }
  }
}
