include "globals.mzn";

%------------ PARÁMETROS ------------
enum ACTORES;
array [int, int] of int: Escenas;
array [int] of int: Duracion;

int: numActores = length(ACTORES);
int: numEscenas = length(Duracion);


array[int, int] of int: Disponibilidad;
array[int, int] of int: Evitar;

int: numEvitar = (length(Evitar) div 2);


%------------ VARIABLES ------------
array [1..numEscenas] of var int: ordenEscenas;
array [1..numActores, 1..numEscenas] of var {0,1}: reestructuracion;
array [1..numEscenas] of var int: duracionEscenas;
var int: costoTotal;
array[ACTORES] of var int: tiempoEnSet;
array[1..numEvitar] of var int: encuentros; % arreglo de que se encontraron
var int: tiempoEncuentro; % tiempo que transcurrio en el que actores que se querian evitar, se encontraron

var int: valorCostoMaximo; % Valor del costo maximo calculado de simular que todos los actores participan en todas las obras
var int: sumaCostos; % suma de todos los costos de los actores
var int: sumaTiempos; % suma de todos los tiempos de las obras
var int: costoNorm; % costo normalizado
var int: tiempoNorm; % tiempo normalizado

% Funciones auxiliares para calcular posición inicial y final
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
  
% Funcion para verificar si 2 actores se cruzan en sus participaciones
function var bool: seCruza(var int: pos1x,var int: pos1y, var int: pos2x,var int: pos2y) = 
 if (pos1x >= pos2x /\ pos1x <= pos2y) \/ (pos2x >= pos1x /\ pos2x <= pos1y)
 then true
 else false endif;

%------------ RESTRICCIONES ------------
% Todas las escenas son diferentes
constraint alldifferent(ordenEscenas);

% Si cambio una escena de su lugar, se actualiza la tabla con sus actores
constraint forall(j in 1..numEscenas, i in 1..numActores)(
  reestructuracion[i,j] = Escenas[i,ordenEscenas[j]]
);

% Si cambio una escena de lugar, se cambia también su posición en la duración
constraint forall(i in 1..numEscenas)(
  duracionEscenas[i] = Duracion[ordenEscenas[i]]
);

% Calcular el tiempo total que cada actor pasa en el set
constraint forall(a in ACTORES) (
    let {
          var int: inicio = posInicial([reestructuracion[a, k] | k in 1..numEscenas], 1);
          var int: fin = posFinal([reestructuracion[a, k] | k in 1..numEscenas], numEscenas);
        } in tiempoEnSet[a] = sum(e in inicio..fin) (duracionEscenas[e])
);

% Verificar que el tiempo en el set sea menor o igual a la disponibilidad
constraint forall(a in ACTORES) (
    (Disponibilidad[a, 2] > 0 -> tiempoEnSet[a] <= Disponibilidad[a, 2])
);

 % Se verifica si dos actores que no se quieren ver coinciden, si coinciden se guarda las horas que coincidieron
constraint forall(a in 1..numEvitar)
        (
          let {
            % Se calcula si las personas que se quieren evitar se cruzan
            var int: inicio1 = posInicial([reestructuracion[Evitar[a, 1], k] | k in 1..numEscenas], 1);
            var int: fin1 = posFinal([reestructuracion[Evitar[a, 1], k] | k in 1..numEscenas], numEscenas);
            var int: inicio2 = posInicial([reestructuracion[Evitar[a, 2], k] | k in 1..numEscenas], 1);
            var int: fin2 = posFinal([reestructuracion[Evitar[a, 2], k] | k in 1..numEscenas], numEscenas);
          } in if seCruza(inicio1,fin1,inicio2,fin2) 
                 then 
                      (
                        % se identifica en que obras se cruzan y se calcula el tiempo en el que se cruzaron
                        let {
                          var int: ini = if inicio1 >= inicio2 then inicio1 else inicio2 endif;
                          var int: end = if fin1 <= fin2 then fin1 else fin2 endif;
                        } in encuentros[a] = sum(i in ini..end)(duracionEscenas[i])
                      )
                 else true endif
        ); 
        
% Tiempo total en el que diferentes actores que no querian encontrarse, se encontraron
constraint tiempoEncuentro = sum(i in 1..numEvitar)(encuentros[i]);

% Suma de los costos de todos los actores
constraint sumaCostos = sum(i in 1..numActores)(Escenas[i,numEscenas+1]);
% Suma de los tiempos totales de las obras
constraint sumaTiempos = sum(i in 1..numEscenas)(duracionEscenas[i]);
% Valor maximo que se podria gastar en una obra si todos los actores participaran en todas las obras       
constraint valorCostoMaximo =  sumaCostos*sumaTiempos;

%------------ RESTRICCIONES REDUNDANTES ------------

% El punto de inicio de la grabacion de cada uno de los actores debe ser menor o igual a su punto de fin.
constraint forall(i in 1..numActores)(posInicial([reestructuracion[i, k] | k in 1..numEscenas], 1) <= posFinal([reestructuracion[i, k] | k in 1..numEscenas], numEscenas));

% Cada actor no participa en ninguna escena antes de su primera escena.
constraint forall(i in 1..numActores)(forall(j in 1..posInicial([reestructuracion[i, k] | k in 1..numEscenas], 1)-1)(reestructuracion[i, j] = 0));

% Cada actor no participa en ninguna escena despues de su ultima escena.
constraint forall(i in 1..numActores)(forall(j in posFinal([reestructuracion[i, k] | k in 1..numEscenas], numEscenas)+1..numEscenas)(reestructuracion[i, j] = 0));

% Cada actor participa en el mismo numero de escenas antes y despues de cambiar el orden de grabación.
constraint forall(i in 1..numActores) (sum(j in 1..numEscenas) (Escenas[i,j]) = sum(k in 1..numEscenas) (reestructuracion[i,k]));

% Ambas matrices deben contener las misma cantidad de 1's.
constraint sum (i in 1..numActores, j in 1..numEscenas)(Escenas[i,j]) = sum(k in 1..numActores, l in 1..numEscenas) (reestructuracion[k,l]);

% La duración de todas las escenas es la mima antes y despues de cambiar el orden de grabación.
constraint sum (i in 1..numEscenas)(Duracion[i]) = sum(i in 1..numEscenas) (duracionEscenas[i]);

%------------ RESTRICCIONES SIMETRICAS ------------


%------------ DOMINIOS ------------
constraint costoTotal >= 0;

constraint forall(i in 1..numEscenas)(
  ordenEscenas[i] > 0 /\ ordenEscenas[i] <= numEscenas
);

constraint forall(i in 1..numEscenas)(
  duracionEscenas[i] > 0
);

constraint tiempoEncuentro >= 0;
constraint valorCostoMaximo >= 0;
constraint sumaCostos >= 0;
constraint sumaTiempos >= 0;
constraint costoNorm >= 0;
constraint tiempoNorm >= 0;

% Costo total
constraint costoTotal = sum(i in 1..numActores)(
  let {
    var int: inicio = posInicial([reestructuracion[i, k] | k in 1..numEscenas], 1);
    var int: fin = posFinal([reestructuracion[i, k] | k in 1..numEscenas], numEscenas);
    } in ((sum(j in inicio..fin)(duracionEscenas[j])) * Escenas[i, numEscenas+1])
);

%------------ OBJETIVO ------------

constraint costoNorm = (costoTotal*100 div valorCostoMaximo*100)*90;
constraint tiempoNorm = (tiempoEncuentro*100 div sumaTiempos*100)*10;

%constraint costoNorm = (costoTotal);
%constraint tiempoNorm = (tiempoEncuentro);

% Solución del problema
ann: search_ann;

solve :: search_ann minimize  costoNorm + tiempoNorm;
                             
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