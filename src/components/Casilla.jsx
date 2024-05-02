import React, { useState, useEffect } from 'react';

import '../styles/Casilla.css'

const Casilla = (args) => {

    // Definir los colores de las casillas según la arena seleccionada
    let BLANCO, NEGRO;
    switch (args.arena) {
        case 'Madera':
            BLANCO = '#8B4513';
            NEGRO = '#D2B48C';
            break;
        case 'Marmol':
            BLANCO = '#f5f5f5';
            NEGRO = '#B8B8B8';
            break;
        case 'Oro':
            BLANCO = '#FFEA70';
            NEGRO = '#F5D000';
            break;
        case 'Esmeralda':
            BLANCO = '#50C878';
            NEGRO = '#38A869';
            break;
        case 'Diamante':
        default:
            BLANCO = '#F0F0F0';
            NEGRO = '#B0E0E6';
            break;
    }

    const mFila = args.rowIndex
    const mCol = args.colIndex

    //PARA MOSTRAR TABLERO CON NEGRAS ABAJO CAMBIAR LOS #COLORES
    const colorCasilla = ((mFila+mCol) %2 === 0)? BLANCO : NEGRO

    const imagen = {
        height: '90%',
        width: '90%',
    }

    function char2Src(char, alcanzable) {
        let img = ''
        let alt = ''
        switch (char) {
            case 'p':
                img = require('../images/pieces/cburnett/bP.svg').default;
                alt = 'peon negro';
                break;
            case 'r':
                img = require('../images/pieces/cburnett/bR.svg').default;
                alt = 'torre negra';
                break;
            case 'n':
                img = require('../images/pieces/cburnett/bN.svg').default;
                alt = 'caballo negro';
                break;
            case 'b':
                img = require('../images/pieces/cburnett/bB.svg').default;
                alt = 'alfil negro';
                break;
            case 'q':
                img = require('../images/pieces/cburnett/bQ.svg').default;
                alt = 'reina negra';
                break;
            case 'k':
                img = require('../images/pieces/cburnett/bK.svg').default;
                alt = 'rey negro';
                break;
            case 'P':
                img = require('../images/pieces/cburnett/wP.svg').default;
                alt = 'peon blanco';
                break;
            case 'R':
                img = require('../images/pieces/cburnett/wR.svg').default;
                alt = 'torre blanca';
                break;
            case 'N':
                img = require('../images/pieces/cburnett/wN.svg').default;
                alt = 'caballo blanco';
                break;
            case 'B':
                img = require('../images/pieces/cburnett/wB.svg').default;
                alt = 'alfil blanco';
                break;
            case 'Q':
                img = require('../images/pieces/cburnett/wQ.svg').default;
                alt = 'reina blanca';
                break;
            case 'K':
                img = require('../images/pieces/cburnett/wK.svg').default;
                alt = 'rey blanco';
                break;
            default:
                img = require('../images/Empty.svg').default;
                alt = 'casilla vacia';
                break;
        }
        let alcanzableImg = (char === '')? require('../images/alcanzaVacia.svg').default : require('../images/alcanzaMata.svg').default
        return(
            <div style={{position: 'relative'}}>
                <img style={imagen} src={img} alt={alt} />
                {alcanzable !== '' &&
                    <img style={{...imagen, position: 'absolute', top: 0, left: 0}} src={alcanzableImg}/>}
            </div>
        )
    
        
    }

    const [hovered, setHovered] = useState(false);

    const handleMouseIn = () => {setHovered(true)}
    const handleMouseOut = () => {setHovered(false)}

    
    /**
     * Maneja el evento de clic para la casilla.
     */
    const handleClick = () => {
        
        //Si soy una casilla con una pieza seleccionable y me seleccionan cambio piezaSel
        if ('['+mFila+'-'+mCol+']' in args.movsPosibles){
            console.log('piezaSel: ', mFila, ',', mCol)
            args.setPiezaSel({fila: mFila, col: mCol})
        } else { //Si me han clickado y no soy una pieza seleccionable (entre las q tienen movs posibles)
          if (args.piezaSel!==null){ //Si hay una pieza seleccionada
              //Se comprueba si esta casilla esta entre movs posibles de la pieza seleccionada, si lo esta setNewMov
              const filaSel = args.piezaSel.fila
              const colSel = args.piezaSel.col
              const soyMovPosible = args.movsPosibles['['+filaSel+'-'+colSel+']'].some(
                  (element) => element[0] === mFila && element[1] === mCol
              );
              if (soyMovPosible) {
                  args.setNewMov({fila: mFila, col: mCol})
              }
            }  
        }
    }

    
    return (
        <button 
            onClick={handleClick} 
            onMouseEnter={handleMouseIn} 
            onMouseLeave={handleMouseOut}
            className="casilla-base" // Aplicar la clase CSS para los estilos base
           style={{
                backgroundColor: hovered ? '#D3FFDE' : colorCasilla,
                transform: !args.blancasAbajo ? 'rotate(180deg)' : 'none' // Aplica rotación si blancasAbajo es true
            }} // Aplicar dinámicamente el color de la casilla
        >       
        {char2Src(args.tablero[mFila][mCol], args.alcanzables[mFila][mCol])}

        </button>
     );
}
 
export default Casilla;