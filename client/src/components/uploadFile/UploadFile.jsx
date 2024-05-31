import {
  rtfToTxt,
  formatToJsonBasic,
  formatToJsonExtended,
} from "@/utils/transformers";
import "./uploadFile.css"
import { useState } from "react";

export default function UploadFile({ handleFile, isBasic, reload }) {
  const [ready, setReady] = useState("")
  
  async function onInputChange(e) {
    const file = e.target.files[0];

    let data = await file.text();
  
    if (file.name.includes('.rtf')) {
      setReady('Archivo cargado exitosamente')
      if (isBasic) data = formatToJsonBasic(rtfToTxt(data));
      else data = formatToJsonExtended(rtfToTxt(data));
    }
  
    handleFile(data);
  }

  return (
    <div className="UploadFile">
      <label htmlFor="file-input">
        Seleccionar archivo
      </label>
      <input id="file-input" type="file" onChange={onInputChange} onClick={reload} />
      <p>{ready}</p>
    </div>
  );
}
