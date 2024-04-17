import React, { useState } from 'react';

import '../styles/Casilla.css'

const Casilla = (args) => {

    /* const BLANCO = '#ADF597'
    const NEGRO = '#2E960F' */ 
    /* const BLANCO = '#8B4513' // Madera
    const NEGRO = '#D2B48C' */  
    /* const BLANCO = '#f5f5f5' // Mármol
    const NEGRO = '#B8B8B8' */
    /* const BLANCO = '#FFEA70' // Oro
    const NEGRO = '#F5D000' */ 
    /* const BLANCO = '#50C878' // Esmeralda
    const NEGRO = '#38A869'  */
    // let BLANCO = '#F0F0F0' // Diamante
    // let NEGRO = '#B0E0E6' 
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

    function char2Src(char) {
        switch (char) {
            case 'p':
                return <img style={imagen} src={require('../images/pieces/cburnett/bP.svg').default} alt='Descripción de la pieza' />
            case 'P':
                return <img style={imagen} src={require('../images/pieces/cburnett/wP.svg').default} alt='Descripción de la pieza' />
            case 'r':
                return <img style={imagen} src={require('../images/pieces/cburnett/bR.svg').default} alt='Descripción de la pieza' />
            case 'R':
                return <img style={imagen} src={require('../images/pieces/cburnett/wR.svg').default} alt='Descripción de la pieza' />
            case 'n':
                return <img style={imagen} src={require('../images/pieces/cburnett/bN.svg').default} alt='Descripción de la pieza' />
            case 'N':
                return <img style={imagen} src={require('../images/pieces/cburnett/wN.svg').default} alt='Descripción de la pieza' />
            case 'b':
                return <img style={imagen} src={require('../images/pieces/cburnett/bB.svg').default} alt='Descripción de la pieza' />
            case 'B':
                return <img style={imagen} src={require('../images/pieces/cburnett/wB.svg').default} alt='Descripción de la pieza' />
            case 'q':
                return <img style={imagen} src={require('../images/pieces/cburnett/bQ.svg').default} alt='Descripción de la pieza' />
            case 'Q':
                return <img style={imagen} src={require('../images/pieces/cburnett/wQ.svg').default} alt='Descripción de la pieza' />
            case 'k':
                return <img style={imagen} src={require('../images/pieces/cburnett/bK.svg').default} alt='Descripción de la pieza' />
            case 'K':
                return <img style={imagen} src={require('../images/pieces/cburnett/wK.svg').default} alt='Descripción de la pieza' />
            default:
                return <img style={imagen} src={require('../images/pieces/Empty.svg').default} alt='Descripción de la pieza' />

        }   
    }

    const [hovered, setHovered] = useState(false);

    const handleMouseIn = () => {setHovered(true)}
    const handleMouseOut = () => {setHovered(false)}

    
    /**
     * Maneja el evento de clic para la casilla.
     */
    const handleClick = () => {
        // console.log( args.tablero[mFila][mCol]);
        // console.log("soy "+mFila + " col "+ mCol );
        
        //Si soy una casilla con una pieza seleccionable y me seleccionan cambio piezaSel
        if (args.tablero[mFila][mCol] !== '' && '['+mFila+'-'+mCol+']' in args.movsPosibles && args.piezaSel===null
        && ((args.tablero[mFila][mCol] === args.tablero[mFila][mCol].toUpperCase() && args.turno === 0) ||
        args.tablero[mFila][mCol] === args.tablero[mFila][mCol].toLowerCase() && args.turno === 1)){
            console.log('piezaSel: ', mFila, ',', mCol)
            args.setPiezaSel({fila: mFila, col: mCol})
        } else {
          if (args.piezaSel!==null ){ //Si piezaSel esta definida (hay una pieza seleccionada)
            if(args.tablero[mFila][mCol] !== '' && ((args.tablero[mFila][mCol] === args.tablero[mFila][mCol].toUpperCase() && args.turno === 0)
            || (args.tablero[mFila][mCol] === args.tablero[mFila][mCol].toLowerCase() && args.turno === 1))){
              // console.log('nuevopiezaSel: ', mFila, ',', mCol)
              // console.log("turno y emas, ", args.tablero[mFila][mCol], "   ", args.turno)
              args.setPiezaSel({fila:mFila, col:mCol});
            }else{
              const filaSel = args.piezaSel.fila
              const colSel = args.piezaSel.col
              //Se comprueba si esta casilla esta entre movs posibles de la pieza seleccionada
              const soyMovPosible = args.movsPosibles['['+filaSel+'-'+colSel+']'].some(
                  (element) => element[0] === mFila && element[1] === mCol
              );
              if (soyMovPosible) {
                  args.setNewMov({fila: mFila, col: mCol})
              }
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
        >       {char2Src(args.tablero[mFila][mCol])}
        </button>
     );
}
 
export default Casilla;