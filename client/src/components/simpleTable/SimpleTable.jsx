import "./simpleTable.css";

export default function Table({ title, data }) {
  let i = 1; // Filas del contenido
  let j = 1; // Columnas del contenido
  let k = 1; // Para columna inicial
  let l = 1; // Para fila inicial

  return (
    <div className="Simple_table">
      <p className="item_title">{title}</p>
      <div
        className="table_container"
        style={{
          gridTemplateRows: `repeat (2, 1fr)`,
          gridTemplateColumns: `repeat (1, 1fr) repeat(${data.numeroEscenas}, 1fr)`,
        }}
      >
        {data.ordenEscenas.map((element) => {
          l++;
          return (
            <p
              key={l}
              className="item_name_top"
              style={{
                gridRowStart: `${0}`,
                gridRowEnd: `${1}`,
                gridColumnStart: `${l}`,
                gridColumnStart: `${l + 1}`,
              }}
            >
              E_{element}
            </p>
          );
        })}
        <p
          className="item_name"
          style={{ gridRowStart: `${2}`, gridRowEnd: `${3}` }}
        >
          Duración de cada escena
        </p>
        {data.duracionEscenas.map((item) => {
          j++;
          return (
            <div
              key={i + j}
              className={`item_number number`}
              style={{
                gridRowStart: `${2}`,
                gridRowEnd: `${3}`,
                gridColumnStart: `${j}`,
                gridColumnStart: `${j + 1}`,
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
