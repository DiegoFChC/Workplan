include "globals.mzn";

%------------ PARÁMETROS ------------
enum ACTORES;
array [int, int] of int: Escenas;
array [int] of int: Duracion;

int: numActores = length(ACTORES);
int: numEscenas = length(Duracion);

%------------ VARIABLES ------------
array [1..numEscenas] of var 1..numEscenas: ordenEscenas;
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

%------------ RESTRICCIONES REDUNDANTES ------------

% Ambas matrices deben contener las misma cantidad de 1's.
constraint sum (i in 1..numActores, j in 1..numEscenas)(Escenas[i,j]) = sum(k in 1..numActores, l in 1..numEscenas) (reestructuracion[k,l]);

% El punto de inicio de la grabacion de cada uno de los actores debe ser menor o igual a su punto de fin.
constraint forall(i in 1..numActores)(posInicial([reestructuracion[i, k] | k in 1..numEscenas], 1) <= posFinal([reestructuracion[i, k] | k in 1..numEscenas], numEscenas));

% Cada actor no participa en ninguna escena antes de su primera escena.
constraint forall(i in 1..numActores)(forall(j in 1..posInicial([reestructuracion[i, k] | k in 1..numEscenas], 1)-1)(reestructuracion[i, j] = 0));

% Cada actor no participa en ninguna escena despues de su ultima escena.
constraint forall(i in 1..numActores)(forall(j in posFinal([reestructuracion[i, k] | k in 1..numEscenas], numEscenas)+1..numEscenas)(reestructuracion[i, j] = 0));

% Cada actor participa en el mismo numero de escenas antes y despues de cambiar el orden de grabación.
constraint forall(i in 1..numActores) (sum(j in 1..numEscenas) (Escenas[i,j]) = sum(k in 1..numEscenas) (reestructuracion[i,k]));

% La duración de todas las escenas es la mima antes y despues de cambiar el orden de grabación.
constraint sum (i in 1..numEscenas)(Duracion[i]) = sum(i in 1..numEscenas) (duracionEscenas[i]);

%------------ RESTRICCIONES SIMETRICAS ------------

%constraint lex_greatereq(ordenEscenas, reverse(ordenEscenas));

%------------ DOMINIOS ------------
constraint costoTotal >= 0;

constraint forall(i in 1..numEscenas)(
  duracionEscenas[i] > 0
);

%------------ FUNCION OBJETIVO ------------
constraint costoTotal = sum(i in 1..numActores)(
  let {
    var int: inicio = posInicial([reestructuracion[i, k] | k in 1..numEscenas], 1);
    var int: fin = posFinal([reestructuracion[i, k] | k in 1..numEscenas], numEscenas);
    } in ((sum(j in inicio..fin)(duracionEscenas[j])) * Escenas[i, numEscenas+1])
);


% Solucion del problema               

solve :: int_search(ordenEscenas, anti_first_fail, indomain_max) minimize costoTotal;

%------------ SALIDA ------------
output [if i == numEscenas
          then "\(ordenEscenas[i])"
        else "\(ordenEscenas[i]), "
        endif | i in 1..numEscenas] ++ ["\n"] ++
       [if j == numEscenas
          then "\(duracionEscenas[j])"
        else "\(duracionEscenas[j]), "
        endif | j in 1..numEscenas] ++ ["\n"] ++
       ["\(costoTotal)"] ++ ["\n"] ++
       [if n == numEscenas
          then "\(reestructuracion[m,n])\n"
        else "\(reestructuracion[m,n]), "
        endif | m in 1..numActores, n in 1..numEscenas] ++ ["\n"];