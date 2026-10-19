import React, { Component } from "react";
import Serie from "../assets/Serie.webp";

export default class HomeComponent extends Component {
  render() {
    return (
      <div>
        <h1>Series Home</h1>
        <img src={Serie} alt="Series Home" />
      </div>
    );
  }
}
