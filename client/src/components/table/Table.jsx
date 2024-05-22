import "./table.css";

export default function Table({ title, data }) {
  let i = 1; // Filas del contenido
  let j = 1; // Columnas del contenido
  let k = 1; // Para columna inicial
  let l = 1; // Para fila inicial

  return (
    <div className="Table">
      <p className="item_title">{title}</p>
      <div
        className="table_container"
        style={{
          gridTemplateRows: `repeat (1, 2fr) repeat(${data.numeroActores}, 1fr)`,
          gridTemplateColumns: `repeat (1, 1fr) repeat(${data.numeroEscenas}, 1fr)`,
        }}
      >
        {data.ordenEscenas.map((element) => {
          l++;
          return (
            <p
              key={l}
              className="item_name_top"
              style={{ gridColumnStart: `${l}`, gridColumnStart: `${l + 1}` }}
            >
              E_{element}
            </p>
          );
        })}
        {data.actores.map((element) => {
          k++;
          return (
            <p
              key={element}
              className="item_name"
              style={{ gridRowStart: `${k}`, gridRowEnd: `${k + 1}` }}
            >
              {element}
            </p>
          );
        })}
        {data.participacion.map((element) => {
          i++;
          j = 1;
          return element.map((item) => {
            j++;
            let myDiv = (
              <div
                key={i + j}
                className={`item_number ${item == 0 ? 'zero' : 'one'}`}
                style={{
                  gridRowStart: `${i}`,
                  gridRowEnd: `${i + 1}`,
                  gridColumnStart: `${j}`,
                  gridColumnStart: `${j + 1}`,
                }}
              >
                {/* {item} */}
              </div>
            );
            return myDiv;
          });
        })}
      </div>
    </div>
  );
}
