import React, { useEffect, useState } from 'react';
import Casilla from './Casilla';
import '../styles/Tablero.css'
const Tablero = () => {

    const gridStyle = {
        display: 'grid',
    };

    function traducirTableroAJSON(matrizAux) {
        const piezas = {
            'p': 'peones',
            'n': 'caballos',
            'b': 'alfiles',
            'r': 'torres',
            'q': 'damas',
            'k': 'reyes',
        };

        const json = {
            turno: turno === 0 ? 'blancas' : 'negras', // Añadir el turno al principio del JSON
            peones: [],
            alfiles: [],
            caballos: [],
            torres: [],
            damas: [],
            reyes: []
        };
        const matrizReorganizada = matrizAux.slice().reverse();

        matrizReorganizada.forEach((fila, x) => {
            fila.forEach((pieza, y) => {
                if (pieza !== '') {
                    const color = (pieza === pieza.toUpperCase() ? 'blancas' : 'negras');
                    const tipo = piezas[pieza.toLowerCase()];
                    json[tipo].push({
                        x: y,
                        y: x, // Invertir la posición
                        color: color
                    });
                }
            });
        });

        return json;
    }

    function transformarMovimientos(json) {
        const movsPosiblesIni = {};

        Object.keys(json.allMovements).forEach(pieza => {
            json.allMovements[pieza].forEach((movimientos, index) => {
                let newX=0;
                let newY=0;
                let key=0;
                if (Array.isArray(movimientos)) {
                    movimientos.forEach((movimiento, i) => {
                        if(i===0){
                            newX = movimiento.fromColor === 'blancas' ? 7 - movimiento.fromY : 7 - movimiento.fromY;
                            newY = movimiento.fromX;
                            key = `[${newX}-${newY}]`;
                        }
                        if (!movsPosiblesIni[key]) {
                            movsPosiblesIni[key] = [];  
                        }else{
                            movsPosiblesIni[key].push([7 - movimiento.y, movimiento.x]);
                        }
                    });
                } /* else {
                    console.log(pieza)
                    // console.log(movimiento.fromColor)
                    const newX = movimientos.fromColor === 'blancas' ? 7 - movimientos.fromY : 7-movimientos.fromY;
                    const newY = movimientos.fromColor === 'blancas' ? movimientos.fromX : movimientos.fromX;
                    const key = `[${newX}-${newY}]`;
                    if (!movsPosiblesIni[key]) {
                        movsPosiblesIni[key] = [];
                    }
                    // movsPosiblesIni[key].push([movimientos.y, movimientos.x]);
                } */
            });
        });

        return movsPosiblesIni;
    }


    //cjto de movimientos posibles con la conf. de tablero actual
    const movsPosiblesIni = {
        '[7-0]': [], //En este caso es para las negras
        '[7-1]': [[5,0], [5,2]],
        '[7-2]': [],
        '[7-3]': [],
        '[7-4]': [],
        '[7-5]': [],
        '[7-6]': [[5,5], [5,7]],
        '[7-7]': [],
        '[6-0]': [[5,0],[4,0]],
        '[6-1]': [[5,1],[4,1]],
        '[6-2]': [[5,2],[4,2]],
        '[6-3]': [[5,3],[4,3]],
        '[6-4]': [[5,4],[4,4]],
        '[6-5]': [[5,5],[4,5]],
        '[6-6]': [[5,6],[4,6]],
        '[6-7]': [[5,7],[4,7]],
    }

    const [movsPosibles, setMovsPosibles] = useState(movsPosiblesIni)


    // K: rey
    // Q: reina
    // B: alfil
    // N: caballo
    // R: torre
    // P: peón
    // minúsculas: negras
    // mayúsculas: blancas
    const matrizIni = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['' , '' , '' , '' ,'' , '' , '' , '' ],
        ['' , '' , '' , '' ,'' , '' , '' , '' ],
        ['' , '' , '' , '' ,'' , '' , '' , '' ],
        ['' , '' , '' , '' ,'' , '' , '' , '' ],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ]
    const [tablero, setTablero] = useState(matrizIni)


    //Coordenadas de la pieza seleccionada
    const [piezaSel, setPiezaSel] = useState(null)

    //movimiento es:
    //{fil:x, col:y} (coordenadas a las que se ha movido piezasel)
    const [movimiento, setNewMov] = useState(0)

    // Que color esta jugando. 0: blancas, 1: negras
    const [turno, setTurno] = useState(0) 
    
    // Funcion que envia el tablero al servidor y recibe el json con los movimientos posibles dado dicho tablero
    const submitMov = async()=>{
        try {
            const jsonMatriz = traducirTableroAJSON(tablero); // Convertir el objeto en una cadena JSON
            console.log('tablero a mandar:');
            console.log(jsonMatriz);
            const response = await fetch("http://localhost:3001/play/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(jsonMatriz),
            });
            const parseRes = await response.json(); // parseRes es el objeto JSON que se recibe

            console.log('movimientos posibles:');
            console.log(parseRes);
            // console.log(transformarMovimientos(parseRes));
            setMovsPosibles(transformarMovimientos(parseRes))

            
        } catch (err) {
            console.error('pillao un error en submitMov:');
            console.error(err.message);
        }
    }

    //Ocurre un movimiento
    useEffect(() => {
        if(piezaSel && movimiento !== 0){ //Si ha ocurrido un movimiento
            //Se obtienen las coordenadas de la casilla origen
            const oldX = piezaSel.fila
            const oldY = piezaSel.col
            //Se obtienen las coordenadas de la casilla destino
            const newX = movimiento.fila
            const newY = movimiento.col
            
            // Se intercambian los contenidos de las casillas
            const newTablero = [...tablero] //asi se hace una copia
            newTablero[newX][newY] = tablero[oldX][oldY]
            newTablero[oldX][oldY] = ''
            setTablero(newTablero)
            submitMov(); //Se envia el tablero al servidor y se actualiza movsPosibles

            setPiezaSel(null) //No hay piezas seleccionadas
            setTurno((turno === 0)? 1:0) //Cambia el color que tiene el turno
        }
    }, [movimiento])
    return (
        <>
        <div style={gridStyle} className='tablero'>
            {[...Array(8)].map((_, rowIndex) => (
                <div key={rowIndex}  className="filatab">
                    {[...Array(8)].map((_, colIndex) => (
                        <Casilla 
                            key={`${rowIndex}-${colIndex}`} // Add unique key prop here
                            tablero={tablero}
                            rowIndex={rowIndex} 
                            colIndex={colIndex} 
                            piezaSel={piezaSel} 
                            setPiezaSel={setPiezaSel}
                            movsPosibles={movsPosibles}
                            mov={movimiento} 
                            setNewMov={setNewMov}
                            turno={turno}
                        />
                    ))}
                </div>
            ))}
        </div>
        {/* <button >
            pisel:  
            {piezaSel? tablero[piezaSel.fila][piezaSel.col]:'napues'}
            {piezaSel? piezaSel.fila : 'na'} {piezaSel? piezaSel.col : 'na'}
        </button> */}
        {/* <div>turno: {turno}</div> */}
        </>
    );
};

export default Tablero;
