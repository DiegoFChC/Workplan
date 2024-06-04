import "./versus.css";

export default function Versus({ names, isResult, hours }) {
  return (
    <div className="Versus">
      <div className="name1">{names[0]}</div>
      <div className="name2">{names[1]}</div>
      {isResult ? <div className="hour">Se ven {hours} hora(s)</div> : null}
    </div>
  );
}
