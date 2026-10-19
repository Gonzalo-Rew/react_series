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
      return <div className="rounded-lg bg-white p-6 text-slate-600 shadow-sm">Cargando serie...</div>;
    } else if (!this.state.serie) {
      return <div className="rounded-lg bg-white p-6 text-slate-600 shadow-sm">No se encontró la serie.</div>;
    } else {
      return (
        <div className="space-y-5 rounded-xl bg-white p-6 shadow-md">
          <img
            src={this.state.serie?.imagen}
            alt={this.state.serie?.name}
            className="max-h-96 w-full rounded-lg object-cover"
          />
          <h3 className="text-2xl font-bold text-slate-800">{this.state.serie?.nombre}</h3>
          <p className="text-slate-600">IMDB: {this.state.serie?.puntuacion}</p>
          <NavLink
            className="inline-block rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            to={"/personajes/" + this.state.serie?.idSerie}
          >
            Personajes
          </NavLink>
        </div>
      );
    }
  }
}
