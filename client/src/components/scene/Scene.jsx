import Table from "../table/Table";
import SimpleTable from "../simpleTable/SimpleTable";
import "./scene.css";
import Avatar from "../avatar/Avatar";

export default function Scene({ data }) {
  return (
    <>
      <div className="scene_actors">
        <p className="item_title">Actores</p>
        <div className="actors_list">
          {/* <Avatar name={'Diego Fernando Chaverra Castillo'} price={'10000'}/> */}
          {data.actores.map((item, index) => {
            return (
              <Avatar key={item} name={item} price={data.precioHora[index]} />
            );
          })}
        </div>
      </div>
      <Table title={"Participación en escenas"} data={data} />
      <SimpleTable title={"Duración de escenas"} data={data} />
    </>
  );
}
