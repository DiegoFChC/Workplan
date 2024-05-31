"use client";
import "./extended.css";
import Scene from "@/components/scene/Scene";
import icon from "../../../public/back.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import UploadFile from "@/components/uploadFile/UploadFile";
import Loader from "@/components/loader/Loader";

let defaultModels = ["Desconocido"];

export default function Extended() {
  const [modeSelected, setModeSelected] = useState(false);
  const [modeUploadSelected, setUploadModeSelected] = useState(false);
  const [newScene, setNewScene] = useState(false);
  const [uploadScene, setUploadScene] = useState(false);
  const [optionSelected, setOptionSelected] = useState("");
  const [data, setData] = useState(false);
  const [extendedScenes, setExtendedScenes] = useState(null);
  const [currentSceneSelected, setCurrentSceneSelected] = useState(null);
  const [modelResult, setModelResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:1234/extended")
      .then((res) => res.json())
      .then((res) => {
        setExtendedScenes(res);
      });
  }, []);

  function searchScene() {
    if (optionSelected == "" || optionSelected == "Sin selección") {
      setOptionSelected("Otro");
    } else {
      let myScene = extendedScenes.filter((item) => item.titulo == optionSelected);
      setCurrentSceneSelected(myScene[0]);

      if (optionSelected != "" && optionSelected != "Sin selección") {
        setData(true);
      }
    }
  }

  function backPage() {
    setOptionSelected("");
    setModelResult(null);
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

  async function proccessData() {
    let dataToSend = currentSceneSelected;
    setLoading(true);
    fetch("http://localhost:1234/extended", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((res) => {
        setModelResult(res);
        setLoading(false);
      });
  }

  async function handleUploadFile(data) {
    setData(true);
    setCurrentSceneSelected(data);
  }

  function reloadFile() {
    setOptionSelected("");
    setModelResult(null);
  }

  return (
    <div className="Extended">
      {loading ? <Loader /> : null}
      <h1 className="extended_title">Plan de trabajo básico</h1>
      <p className="extended_paragraph">
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
          <div className="extended_question1">
            <p className="extended_question_p">
              ¿Quieres crear un escenario propio?
            </p>
            <div className="extended_question_buttons">
              <button
                onClick={() => {
                  setModeSelected(true);
                  setNewScene(true);
                }}
                disabled
              >
                Si
              </button>
              <button onClick={() => setModeSelected(true)}>No</button>
            </div>
          </div>
        ) : null}
        {modeSelected && !modeUploadSelected && !newScene ? (
          <div className="extended_question1">
            <p className="extended_question_p">
              ¿Quieres cargar un escenario propio o uno creado por nosotros?
            </p>
            <div className="extended_question_buttons">
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
          <div className="extended_question2">
            <p className="extended_question_p">
              Esperate que no está desarrollado
            </p>
          </div>
        ) : null}
        {uploadScene ? (
          <div className="extended_question2">
            <UploadFile
              handleFile={handleUploadFile}
              isBasic={false}
              reload={reloadFile}
            />
            <div className="extended_question_buttons">
              <button onClick={() => searchScene()}>Cargar</button>
            </div>
            {/* <p className="basic_question_p">
              Esperate que no está desarrollado
            </p> */}
          </div>
        ) : null}
        {modeSelected && modeUploadSelected && !newScene && !uploadScene ? (
          <div className="extended_question3">
            <p className="extended_question_p">
              Por favor selecciona uno de los escenarios previamente diseñados.
            </p>
            <div className="question3_option">
              <select
                name="options_escenes"
                id="option_escenes"
                onChange={(e) => {
                  setModelResult(null);
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
            <div className="extended_question_buttons">
              <button onClick={() => searchScene()}>Cargar</button>
            </div>
          </div>
        ) : null}
      </div>
      {data &&
      optionSelected != "Sin selección" &&
      optionSelected != "" &&
      extendedScenes != null &&
      currentSceneSelected != null ? (
        <div className="container_scene">
          <h1 className="film_title">{currentSceneSelected.titulo}</h1>
          <Scene data={currentSceneSelected} isBasic={false} />
          <button className="procesar" onClick={() => proccessData()}>
            Procesar
          </button>
        </div>
      ) : null}
      {data &&
      modelResult &&
      optionSelected != "Sin selección" &&
      optionSelected != "" &&
      extendedScenes != null &&
      currentSceneSelected != null ? (
        <div className="container_scene">
          <h1 className="film_title">{modelResult.titulo}</h1>
          <Scene data={modelResult} isBasic={false}/>
          <p className="p_result">
            El costo mínimo encontrado es de{" "}
            <span>$ {modelResult.costo * 100000}</span>
          </p>
        </div>
      ) : null}
    </div>
  );
}
