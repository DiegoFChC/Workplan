import Table from "../table/Table";
import SimpleTable from "../simpleTable/SimpleTable";
import "./scene.css";
import Avatar from "../avatar/Avatar";
import Versus from "../versus/Versus";

export default function Scene({ data, isBasic }) {
  return (
    <>
      <div className="scene_actors">
        <p className="item_title">Actores</p>
        <div className="actors_list">
          {/* <Avatar name={'Diego Fernando Chaverra Castillo'} price={'10000'}/> */}
          {data.actores.map((item, index) => {
            let component = null;
            if (isBasic) {
              component = (
                <Avatar
                  key={item}
                  name={item}
                  price={data.precioHora[index]}
                  availability={null}
                />
              );
            } else {
              component = (
                <Avatar
                  key={item}
                  name={item}
                  price={data.precioHora[index]}
                  availability={data.disponibilidadActores[index]}
                />
              );
            }
            return component;
          })}
        </div>
        {!isBasic ? (
          <>
            <p className="item_title">Actores que prefieren no encontrarse</p>
            <div className="actors_list">
              {/* <Avatar name={'Diego Fernando Chaverra Castillo'} price={'10000'}/> */}
              {data.parejas.map((item, index) => {
                return (
                  <Versus
                    key={item}
                    names={item}
                  />
                );
              })}
            </div>
          </>
        ) : null}
      </div>
      <Table title={"Participación en escenas"} data={data} />
      <SimpleTable title={"Duración de escenas"} data={data} />
    </>
  );
}
