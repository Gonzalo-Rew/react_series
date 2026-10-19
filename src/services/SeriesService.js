import axios from "axios";
import Global from "../Global";

export default class SeriesService {
  async getSeries() {
    const request = "/api/Series";
    const url = Global.urlApiSeries + request;
    return await axios.get(url);
  }

  async getSerieById(id) {
    const request = "/api/Series/" + id;
    const url = Global.urlApiSeries + request;
    return await axios.get(url);
  }

  async getPersonajesBySerieId(id) {
    const request = "/api/Series/PersonajesSerie/" + id;
    const url = Global.urlApiSeries + request;
    return await axios.get(url);
  }
}
