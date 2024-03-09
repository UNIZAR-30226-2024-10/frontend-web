import { useEffect, useState } from 'react';
import { hover } from '@testing-library/user-event/dist/hover';
import './../styles/Casilla.css'
const Casilla = (args) => {
    function char2Src(char) {
        switch (char) {
            case 'p':
                return <img style={imagen} src={require('../images/pieces/pawn-b.svg').default} alt="Descripción de la pieza" />
            case 'P':
                return <img style={imagen} src={require('../images/pieces/pawn-w.svg').default} alt="Descripción de la pieza" />
            case 'r':
                return <img style={imagen} src={require('../images/pieces/rook-b.svg').default} alt="Descripción de la pieza" />
            case 'R':
                return <img style={imagen} src={require('../images/pieces/rook-w.svg').default} alt="Descripción de la pieza" />
            case 'n':
                return <img style={imagen} src={require('../images/pieces/knight-b.svg').default} alt="Descripción de la pieza" />
            case 'N':
                return <img style={imagen} src={require('../images/pieces/knight-w.svg').default} alt="Descripción de la pieza" />
            case 'b':
                return <img style={imagen} src={require('../images/pieces/bishop-b.svg').default} alt="Descripción de la pieza" />
            case 'B':
                return <img style={imagen} src={require('../images/pieces/bishop-w.svg').default} alt="Descripción de la pieza" />
            case 'q':
                return <img style={imagen} src={require('../images/pieces/queen-b.svg').default} alt="Descripción de la pieza" />
            case 'Q':
                return <img style={imagen} src={require('../images/pieces/queen-w.svg').default} alt="Descripción de la pieza" />
            case 'k':
                return <img style={imagen} src={require('../images/pieces/king-b.svg').default} alt="Descripción de la pieza" />
            case 'K':
                return <img style={imagen} src={require('../images/pieces/king-w.svg').default} alt="Descripción de la pieza" />
            default:
                return <img style={imagen} src={require('../images/pieces/Empty.svg').default} alt="Descripción de la pieza" />

        }   
    }

    const mFila = args.rowIndex
    const mCol = args.colIndex
    //todas las casillas son un <div> q comparten este estilo:
    // const estiloBase = {
    //     display: 'flex',
    //     alignItems: 'flex-end', /* Center vertically */
    //     justifyContent: 'center', /* Center horizontally */
    //     height: '100px',
    //     width: '100px',
    //     border: 'none',
    //     transition: 'background-color 0.3s', // Agregamos una transición suave
    // }
    const imagen = {
        height: '90%',
        width: '90%',
    }

    const BLANCO = '#ADF597'
    const NEGRO = '#2E960F'
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);

    };

    //PARA MOSTRAR TABLERO CON NEGRAS ABAJO CAMBIAR LOS #COLORES
    // Dado un indice de fila y columna, determina el color de la casilla
    const colorCasilla = (i,j) => {
        return ((i+j) %2 === 0)? BLANCO : NEGRO
    }

    //determina el estilo de una casilla dado su indice de fila y columna
    // const estiloCasilla = (i,j) => {
    //     const tipoCasilla = {...estiloBase}
    //     tipoCasilla.backgroundColor = colorCasilla(i,j)
    //     return tipoCasilla
    // }


    const handleClick = () => {
        console.log( args.tablero[mFila][mCol]);
        // console.log("soy "+mFila + " col "+ mCol );
        
        //Si soy una casilla con una pieza seleccionable y me seleccionan cambio piezaSel
        if (args.tablero[mFila][mCol] !== ''
            && '['+mFila+'-'+mCol+']' in args.movsPosibles 
            && ((args.tablero[mFila][mCol]===args.tablero[mFila][mCol].toUpperCase() && args.turno===0) || (args.turno ===1 && args.tablero[mFila][mCol]!=args.tablero[mFila][mCol].toUpperCase()))) {
            console.log("piezaSel: ", mFila, ",", mCol)
            args.setPiezaSel({fila: mFila, col: mCol})

        } else {
            if (args.piezaSel){ //Si piezaSel esta definida (hay una pieza seleccionada)
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

    
    return (
        // <button onClick={handleClick} style={estiloCasilla(mFila, mCol)}onMouseEnter={handleMouseEnter} 
        //     onMouseLeave={handleMouseLeave}>
        //     {/* <img style={imagen} src={char2Src(args.tablero[fila][col])} alt="Descripción de la pieza" /> */}
        //     {char2Src(args.tablero[mFila][mCol])}
        // </button >
        <button 
            onClick={handleClick} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
            className="casilla-base" // Aplicar la clase CSS para los estilos base
            style={{ backgroundColor: hovered ? '#CCCCCC' : colorCasilla(mFila, mCol) }} // Aplicar dinámicamente el color de la casilla
        >       {char2Src(args.tablero[mFila][mCol])}
        </button>
     );
}
 
export default Casilla;