import { useEffect, useState } from 'react';
import '../styles/Casilla.css'

const Casilla = (args) => {

    const BLANCO = '#ADF597'
    const NEGRO = '#2E960F'  

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

    const [hovered, setHovered] = useState(false);

    const handleMouseIn = () => {setHovered(true)}
    const handleMouseOut = () => {setHovered(false)}

    
    /**
     * Maneja el evento de clic para la casilla.
     */
    const handleClick = () => {
        console.log( args.tablero[mFila][mCol]);
        // console.log("soy "+mFila + " col "+ mCol );
        
        //Si soy una casilla con una pieza seleccionable y me seleccionan cambio piezaSel
        if (args.tablero[mFila][mCol] !== '' && '['+mFila+'-'+mCol+']' in args.movsPosibles) {
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
        <button 
            onClick={handleClick} 
            onMouseEnter={handleMouseIn} 
            onMouseLeave={handleMouseOut}
            className="casilla-base" // Aplicar la clase CSS para los estilos base
            style={{ backgroundColor: hovered ? '#D3FFDE' : colorCasilla }} // Aplicar dinámicamente el color de la casilla
        >       {char2Src(args.tablero[mFila][mCol])}
        </button>
     );
}
 
export default Casilla;