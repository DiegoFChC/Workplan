include "globals.mzn";

%------------ PARÁMETROS ------------
enum ACTORES;
array [int, int] of int: Escenas;
array [int] of int: Duracion;

int: numActores = length(ACTORES);
int: numEscenas = length(Duracion);

% array [1..20] of int: prueba = array1d([0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

%------------ VARIABLES ------------
array [1..numEscenas] of var int: ordenEscenas;
array [1..numActores, 1..numEscenas] of var {0,1}: reestructuracion;
array [1..numEscenas] of var int: duracionEscenas;
var int: costoTotal;

function var int: posInicial(array [int] of var int: escena, var int: num) =
  if num > numEscenas
  then 1
  elseif sum(i in 1..num)(escena[i]) = 1
  then num
  else
  posInicial(escena, num+1)
  endif;
  
function var int: posFinal(array [int] of var int: escena, var int: num) =
  if num < 1
  then 1
  elseif sum(i in num..numEscenas)(escena[i]) = 1
  then num
  else
  posFinal(escena, num-1)
  endif;

%------------ RESTRICCIONES ------------
% Todas las escenas son diferentes
constraint alldifferent(ordenEscenas);

% Si cambio una escena de su lugar, se actualiza la tabla con sus actores
constraint forall(j in 1..numEscenas, i in 1..numActores)(
  reestructuracion[i,j] = Escenas[i,ordenEscenas[j]]
);

% Si cambio una escena de lugar, se cambia tambien su posición en la duracion
constraint forall(i in 1..numEscenas)(
  duracionEscenas[i] = Duracion[ordenEscenas[i]]
);

%------------ DOMINIOS ------------
constraint costoTotal >= 0;

constraint forall(i in 1..numEscenas)(
  ordenEscenas[i] > 0 /\ ordenEscenas[i] <= numEscenas
);

constraint forall(i in 1..numEscenas)(
  duracionEscenas[i] > 0
);

% Costo total
% constraint forall(i in 1..numActores)(
%   let {
%     var int: inicio = posInicial([reestructuracion[i, k] | k in 1..numEscenas], 1);
%     var int: fin = posFinal([reestructuracion[i, k] | k in 1..numEscenas], numEscenas);
%     } in duracionEscenas[i] = fin
% );

constraint costoTotal = sum(i in 1..numActores)(
  let {
    var int: inicio = posInicial([reestructuracion[i, k] | k in 1..numEscenas], 1);
    var int: fin = posFinal([reestructuracion[i, k] | k in 1..numEscenas], numEscenas);
    } in ((sum(j in inicio..fin)(duracionEscenas[j])) * Escenas[i, numEscenas+1])
);

% constraint forall(i in 1..numActores)(
%   let {
%     var int: inicio = posInicial([reestructuracion[i, k] | k in 1..numEscenas], 1);
%     var int: fin = posFinal([reestructuracion[i, k] | k in 1..numEscenas], numEscenas);
%     } in duracionEscenas[i] = fin
% );

%------------ OBJETIVO ------------
solve minimize costoTotal;



%------------ SALIDA ------------
% output [show(prueba)]
% output [show(posInicial([1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], 1)) ++ ", " ++ show(posFinal([1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], numEscenas))]
% output[show(length(ACTORES))]
% output["\(ACTORES)\n" ++
%        "\(length(Duracion))\n" ++
%        "\(Duracion)"]