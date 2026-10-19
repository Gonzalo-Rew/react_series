import React, { Component } from "react";
import Serie from "../assets/Serie.webp";

export default class HomeComponent extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-800">Series Home</h1>
        <img
          src={Serie}
          alt="Series Home"
          className="w-full rounded-xl object-cover shadow-md"
        />
      </div>
    );
  }
}
