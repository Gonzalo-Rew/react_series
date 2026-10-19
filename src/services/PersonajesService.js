import axios from "axios";
import Global from "../Global";

export default class PersonajesService {
  async getPersonajes() {
    const request = "api/Personajes/";
    const url = Global.urlApiSeries + request;
    return await axios.get(url);
  }
  
  async postPersonaje(personaje) {
    const request = "api/Personajes";
    const url = Global.urlApiSeries + request;
    return await axios.post(url, personaje);
  }

  async putPersonaje(idPersonaje, idSerie) {
    const request = `api/Personajes/${idPersonaje}/${idSerie}`;
    const url = Global.urlApiSeries + request;
    return await axios.put(url);
  }
}
