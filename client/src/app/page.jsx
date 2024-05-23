import "./mainPage.css";
import Card from "@/components/card/Card";
import Create from '../../public/create.png'
import Upload from '../../public/upload.png'
import Run from '../../public/run.png'

export default function Home() {
  return (
    <main className="Main_page">
      <h1 className="main_title">Generando mi plan de trabajo</h1>
      <p className="paragraph">
        Por favor <span>selecciona el modo</span> en que quieres iniciar la
        aplicación, pasa tu mouse sobre cada <span>tarjeta</span> para saber más sobre <span>el modo en el que iniciarás</span>.{" "}
      </p>
      <div className="cards">
        <Card
          title={"Planificador básico"}
          color={"blue"}
          description={
            "En esta sección puedes crear, cargar un escenario por defecto y cargar un archivo .rtf donde tengas las entradas del problema básico."
          }
          isBasic={true}
          img={Upload}
        />
        {/* <Card
          title={"Cargar escenario por defecto (PTB)"}
          color={"purple"}
          description={
            "En esta sección se cargará un escenario del problema básico que está guardado por defecto."
          }
          isBasic={true}
          img={Run}
        /> */}
        <Card
          title={"Planificador extendido"}
          color={"white"}
          description={
            "En esta sección puedes crear, cargar un escenario por defecto y cargar un archivo .rtf donde tengas las entradas del problema extendido."
          }
          isBasic={false}
          img={Run}
        />
        {/* <Card
          title={"Cargar escenario por defecto (PTE)"}
          color={"blue"}
          description={
            "En esta sección se cargará un escenario del problema extendido que está guardado por defecto."
          }
          isBasic={false}
          img={Run}
        /> */}
      </div>
    </main>
  );
}
