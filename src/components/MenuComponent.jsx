import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import SeriesService from "../services/SeriesService";

export default class MenuComponent extends Component {
  seriesService = new SeriesService();

  state = {
    series: [],
  };

  loadSeries = async () => {
    var response = await this.seriesService.getSeries();
    this.setState({
      series: response.data,
    });
  };

  componentDidMount() {
    this.loadSeries();
  }

  render() {
    return (
      <nav className="bg-gray-800 shadow-md" aria-label="Navegación principal">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between px-4 pb-2 sm:flex-row sm:items-center sm:px-6 sm:pb-0">
          <NavLink
            to="/"
            className="py-3 text-xl font-bold text-slate-100 sm:py-4"
          >
            Series
          </NavLink>
          <ul className="flex w-full list-none items-center gap-2 p-0 sm:w-auto">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-slate-100 transition-colors hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/crear-personaje/"
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-slate-100 transition-colors hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                Nuevo Personaje
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/modificar-personaje/"
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-slate-100 transition-colors hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                Modificar Personaje
              </NavLink>
            </li>
            <li className="group relative">
              <NavLink
                id="navbarDropdown"
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-slate-100 transition-colors hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
                to="/"
                aria-haspopup="true"
              >
                Series <span aria-hidden="true">▾</span>
              </NavLink>
              <div
                className="invisible absolute right-0 top-[calc(100%+4px)] z-10 min-w-[180px] rounded-md border border-gray-200 bg-white p-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                aria-labelledby="navbarDropdown"
              >
                {this.state.series.map((serie) => {
                  return (
                    <NavLink
                      key={serie.idSerie}
                      className={({ isActive }) =>
                        `block rounded px-2.5 py-2 text-gray-800 hover:bg-gray-100 ${
                          isActive ? "bg-gray-100" : ""
                        }`
                      }
                      to={"/series/" + serie.idSerie}
                    >
                      {serie.nombre}
                    </NavLink>
                  );
                })}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
