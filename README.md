# Workplan

Aplicación web para organizar de la mejor manera posible el orden de grabación de las escenas de una telenovela, serie o película.

**Nota:** Si está viendo este Readme en modo local, se recomienda verlo en el GitHub del proyecto, para tener una visualización más clara de lo aquí descrito. https://github.com/DiegoFChC/Workplan

## Descripción

Esta es una aplicación basada en Programación por Restricciones, en la cual se trata de minimizar el costo de producción de una telenovela, serie o película, en términos de la organización de grabación de las escenas. Los principales elementos tenidos en cuenta son:

- Escenas a grabar (número y duración).
- Actores (costo por hora, disponibilidad, prefesrencia de compañeros o tiempo con ellos).

En este proyecto se considerana dos modelos, uno básico, el cual minimiza el costo final a pagar a los actores teniendo en cuenta sólo la organización de las escenas. El modelo extendido tiene en cuenta eso y también la disponibilidad de los actores, al igual que sus preferencias sobre con que actores no se quieren encontrar.

## Visuales

Inicio

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://github.com/DiegoFChC/Workplan/blob/main/client/public/Pantalla%201.png)

Problema Básico

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://github.com/DiegoFChC/Workplan/blob/main/client/public/Pantalla%202.png)

Problema Extendido

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://github.com/DiegoFChC/Workplan/blob/main/client/public/Pantalla%203.png)

## Empezando 🚀

Estas instrucciones te guiarán para obtener una copia de este proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Prerrequisitos 📋

- Sistema Operativo - Windows/MacOS/Linux
- Lenguaje de programación - JavaScript
- Node JS

### Instalación 🔧

Para el Front-End, contenido en la carpeta **client**.

```bash
npm install
```

```bash
npm run dev
```

Para el Back-End, contenido en la carpeta **server**.

```bash
npm install
```

```bash
node --watch app.js
```
## Corriendo los modelos en Minizinc

### Problema PlanTeleBascio

Para ejecutar el archivo PlanTeleBasico.mzn, dentro del IDE de miniZinc debe presionar el boton "Run" y escoger alguno de los siguientes archivos de datos para  ejecutar el modelo sobre  esta instancia 
del problema: 

- PlanTeleBasicoData.dzn
- PlanTeleBasicoData1.dzn
- PlanTeleBasicoData2.dzn
- PlanTeleBasicoData3.dzn
- PlanTeleBasicoData4.dzn
- PlanTeleBasicoData5.dzn

### Problema PlanTeleExtendido

Para ejecutar el archivo PlanTeleExtendido.mzn, dentro del IDE de miniZinc debe presionar el boton "Run" y escoger alguno de los siguientes archivos de datos para ejecutar el modelo sobre  esta instancia del problema: 

- PlanTeleExtendidoData.dzn
- PlanTeleExtendidoData1.dzn
- PlanTeleExtendidoData2.dzn
- PlanTeleExtendidoData3.dzn
- PlanTeleExtendidoData4.dzn
- PlanTeleExtendidoData5.dzn

En cada uno de los archivos de datos tambien se encuentran las diferentes estrategias de busqueda que se estudiaron, para ejecutar el modelo con alguno de estas estrategias se debe descomentar la linea, cuando se quiera usar la estrategia de busqueda por defecto se deben comentar todas las estrategias.

Los archivos Trivial1.ptb, Desenfreno1.ptb y Trivial2.ptb, Desenfreno2.pte se pueden cargar desde la GUI.

## Autores ✒️

- **Alejandro Escobar Tafurt** - _Desarrollo de modelos_ - [Alejandro Escobar](https://github.com/alejandro19-19)
- **Alejandro Peñaranda Agudelo** - _Desarrollo de modelos_ - [Alejandro Peñaranda](https://github.com/alejandropenaranda)
- **Diego Fernando Chaverra Castillo** - _Desarrollo de modelos_, _FrontEnd_ - [Diego Chaverra](https://github.com/DiegoFChC)
- **Juan Camilo Santa Gomez** - _Desarrollo de modelos_, _BackEnd_ - [Juan Santa](https://github.com/santa51107HD)
