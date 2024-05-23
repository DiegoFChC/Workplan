"use client";
import "./basic.css";
import Scene from "@/components/scene/Scene";
import ejemploData from "../../dataModels/basic/data2.json";
import icon from "../../../public/back.png";
import Image from "next/image";
import { useState } from "react";

let defaultModels = ["Mortal Engines", "Mad Max"];

export default function Basic() {
  const [modeSelected, setModeSelected] = useState(false);
  const [modeUploadSelected, setUploadModeSelected] = useState(false);
  const [newScene, setNewScene] = useState(false);
  const [uploadScene, setUploadScene] = useState(false);
  const [optionSelected, setOptionSelected] = useState("");
  const [data, setData] = useState(false);

  function loadData() {
    if (optionSelected != "" && optionSelected != "Sin selección") {
      setData(true);
    }
  }

  function backPage() {
    if (modeSelected && modeUploadSelected) {
      setUploadModeSelected(false);
      setUploadScene(false);
      setOptionSelected("");
    } else {
      setModeSelected(false);
      setUploadModeSelected(false);
      setNewScene(false);
      setUploadScene(false);
      setOptionSelected("");
    }
  }

  return (
    <div className="Basic">
      <h1 className="basic_title">Plan de trabajo básico</h1>
      <p className="basic_paragraph">
        En esta sección puedes cargar un escenario creado con anterioridad o en
        su defecto, crear tu propio escenario.
      </p>
      <div className="container_questions">
        <Image
          className="icon"
          src={icon}
          alt="icon"
          onClick={() => backPage()}
        />
        {!modeSelected ? (
          <div className="basic_question1">
            <p className="basic_question_p">
              ¿Quieres crear un escenario propio?
            </p>
            <div className="basic_question_buttons">
              <button
                onClick={() => {
                  setModeSelected(true);
                  setNewScene(true);
                }}
              >
                Si
              </button>
              <button onClick={() => setModeSelected(true)}>No</button>
            </div>
          </div>
        ) : null}
        {modeSelected && !modeUploadSelected && !newScene ? (
          <div className="basic_question1">
            <p className="basic_question_p">
              ¿Quieres cargar un escenario propio o uno creado por nosotros?
            </p>
            <div className="basic_question_buttons">
              <button
                onClick={() => {
                  setUploadModeSelected(true);
                  setUploadScene(true);
                }}
              >
                Propio
              </button>
              <button onClick={() => setUploadModeSelected(true)}>Tuyo</button>
            </div>
          </div>
        ) : null}
        {newScene ? (
          <div className="basic_question2">
            <p className="basic_question_p">
              Esperate que no está desarrollado
            </p>
          </div>
        ) : null}
        {uploadScene ? (
          <div className="basic_question2">
            <p className="basic_question_p">
              Esperate que no está desarrollado
            </p>
          </div>
        ) : null}
        {modeSelected && modeUploadSelected && !newScene && !uploadScene ? (
          <div className="basic_question3">
            <p className="basic_question_p">
              Por favor selecciona uno de los escenarios previamente diseñados.
            </p>
            <div className="question3_option">
              <select
                name="options_escenes"
                id="option_escenes"
                onChange={(e) => {
                  setOptionSelected(e.target.value);
                  setData(false);
                }}
              >
                <option value="Sin selección">Sin selección</option>
                {defaultModels.map((item) => {
                  return (
                    <option key={`${item}`} value={`${item}`}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="basic_question_buttons">
              <button onClick={() => loadData()}>Cargar</button>
            </div>
          </div>
        ) : null}
      </div>
      {data && optionSelected != "Sin selección" && optionSelected != "" ? (
        <div className="container_scene">
          <h1 className="film_title">{ejemploData.titulo}</h1>
          <Scene data={ejemploData} />
        </div>
      ) : null}
    </div>
  );
}
