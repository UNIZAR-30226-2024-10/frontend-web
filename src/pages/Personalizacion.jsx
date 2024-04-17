import React from "react";
import '../styles/Personalizacion.css';
import { useState } from "react";
import SideBar from "../components/SideBar";
import MenuIcon from '@mui/icons-material/Menu';
import Pagination from '@mui/material/Pagination';
/* Importar todas las imágenes de piezas */ 
import {
  AlphaWK, AnarcandyWK, CardinalWK, DefaultWK, CelticWK, Chess7WK, ChessnutWK, CompanionWK, FantasyWK,   
  AlphaWQ, AnarcandyWQ, CardinalWQ, DefaultWQ, CelticWQ, Chess7WQ, ChessnutWQ, CompanionWQ, FantasyWQ,  
  AlphaWN, AnarcandyWN, CardinalWN, DefaultWN, CelticWN, Chess7WN, ChessnutWN, CompanionWN, FantasyWN,  
  AlphaWB, AnarcandyWB, CardinalWB, DefaultWB, CelticWB, Chess7WB, ChessnutWB, CompanionWB, FantasyWB,  
  AlphaWP, AnarcandyWP, CardinalWP, DefaultWP, CelticWP, Chess7WP, ChessnutWP, CompanionWP, FantasyWP,  
  AlphaWR, AnarcandyWR, CardinalWR, DefaultWR, CelticWR, Chess7WR, ChessnutWR, CompanionWR, FantasyWR,  
  AlphaBK, AnarcandyBK, CardinalBK, DefaultBK, CelticBK, Chess7BK, ChessnutBK, CompanionBK, FantasyBK,  
  AlphaBQ, AnarcandyBQ, CardinalBQ, DefaultBQ, CelticBQ, Chess7BQ, ChessnutBQ, CompanionBQ, FantasyBQ,  
  AlphaBN, AnarcandyBN, CardinalBN, DefaultBN, CelticBN, Chess7BN, ChessnutBN, CompanionBN, FantasyBN,  
  AlphaBB, AnarcandyBB, CardinalBB, DefaultBB, CelticBB, Chess7BB, ChessnutBB, CompanionBB, FantasyBB,  
  AlphaBP, AnarcandyBP, CardinalBP, DefaultBP, CelticBP, Chess7BP, ChessnutBP, CompanionBP, FantasyBP,  
  AlphaBR, AnarcandyBR, CardinalBR, DefaultBR, CelticBR, Chess7BR, ChessnutBR, CompanionBR, FantasyBR,  
  KosalWK, FrescaWK, GovernorWK, LeipzigWK, MaestroWK, MpchessWK, PixelWK,
  KosalWQ, FrescaWQ, GovernorWQ, LeipzigWQ, MaestroWQ, MpchessWQ, PixelWQ,
  KosalWN, FrescaWN, GovernorWN, LeipzigWN, MaestroWN, MpchessWN, PixelWN,
  KosalWB, FrescaWB, GovernorWB, LeipzigWB, MaestroWB, MpchessWB, PixelWB,
  KosalWP, FrescaWP, GovernorWP, LeipzigWP, MaestroWP, MpchessWP, PixelWP,
  KosalWR, FrescaWR, GovernorWR, LeipzigWR, MaestroWR, MpchessWR, PixelWR,
  KosalBK, FrescaBK, GovernorBK, LeipzigBK, MaestroBK, MpchessBK, PixelBK,
  KosalBQ, FrescaBQ, GovernorBQ, LeipzigBQ, MaestroBQ, MpchessBQ, PixelBQ,
  KosalBN, FrescaBN, GovernorBN, LeipzigBN, MaestroBN, MpchessBN, PixelBN,
  KosalBB, FrescaBB, GovernorBB, LeipzigBB, MaestroBB, MpchessBB, PixelBB,
  KosalBP, FrescaBP, GovernorBP, LeipzigBP, MaestroBP, MpchessBP, PixelBP,
  KosalBR, FrescaBR, GovernorBR, LeipzigBR, MaestroBR, MpchessBR, PixelBR,
} from '../images/pieces'

function Personalizacion () {
  /* Hook para controlar si el sideBar es visible o no lo es */
  const [showSidebar, setShowSidebar] = useState(false);
  const [rewardShowing, setRewardShowing] = useState('piezas');
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page

  const chunkSizePiezas = 4; // Number of elements per chunk
  const chunkSizeEmotes = 9;

  const [fichasSelected, setFichasSelected] = useState('DEFECTO');
  const [emotesSelected, setEmotesSelected] = useState(['😁️','😂️','👍️','😲️']);

  // Function to split the array into chunks
  const chunkArray = (arr, size) => {
    return arr.reduce((chunks, el, i) => {
      if (i % size === 0) {
        chunks.push([el]);
      } else {
        chunks[chunks.length - 1].push(el);
      }
      return chunks;
    }, []);
  };

  const emotesPreview = ['😁️','😂️','👍️','😲️','😭️','😅️','👊️','🤩️','🤯️','😜️','🫠️','😎️','😡️','😈️','👻️'];

  const piezasPreview = [
    { modelo: 'DEFECTO', negras : [DefaultBK,DefaultBQ,DefaultBN,DefaultBB,DefaultBR,DefaultBP], blancas : [DefaultWK,DefaultWQ,DefaultWN,DefaultWB,DefaultWR,DefaultWP] },
    { modelo: 'ALPHA', negras : [AlphaBK,AlphaBQ,AlphaBN,AlphaBB,AlphaBR,AlphaBP], blancas : [AlphaWK,AlphaWQ,AlphaWN,AlphaWB,AlphaWR,AlphaWP] },
    { modelo: 'CARDINAL', negras: [CardinalBK, CardinalBQ, CardinalBN, CardinalBB, CardinalBR, CardinalBP], blancas: [CardinalWK, CardinalWQ, CardinalWN, CardinalWB, CardinalWR, CardinalWP] },
    { modelo: 'CELTIC', negras : [CelticBK,CelticBQ,CelticBN,CelticBB,CelticBR,CelticBP], blancas : [CelticWK,CelticWQ,CelticWN,CelticWB,CelticWR,CelticWP] },
    { modelo: 'CHESS7', negras: [Chess7BK, Chess7BQ, Chess7BN, Chess7BB, Chess7BR, Chess7BP], blancas: [Chess7WK, Chess7WQ, Chess7WN, Chess7WB, Chess7WR, Chess7WP] },
    { modelo: 'CHESSNUT', negras : [ChessnutBK,ChessnutBQ,ChessnutBN,ChessnutBB,ChessnutBR,ChessnutBP], blancas : [ChessnutWK,ChessnutWQ,ChessnutWN,ChessnutWB,ChessnutWR,ChessnutWP] },
    { modelo: 'COMPANION', negras: [CompanionBK, CompanionBQ, CompanionBN, CompanionBB, CompanionBR, CompanionBP], blancas: [CompanionWK, CompanionWQ, CompanionWN, CompanionWB, CompanionWR, CompanionWP] },
    { modelo: 'FANTASY', negras : [FantasyBK,FantasyBQ,FantasyBN,FantasyBB,FantasyBR,FantasyBP], blancas : [FantasyWK,FantasyWQ,FantasyWN,FantasyWB,FantasyWR,FantasyWP] },
    { modelo: 'FRESCA', negras: [FrescaBK, FrescaBQ, FrescaBN, FrescaBB, FrescaBR, FrescaBP], blancas: [FrescaWK, FrescaWQ, FrescaWN, FrescaWB, FrescaWR, FrescaWP] },
    { modelo: 'GOVERNOR', negras : [GovernorBK,GovernorBQ,GovernorBN,GovernorBB,GovernorBR,GovernorBP], blancas : [GovernorWK,GovernorWQ,GovernorWN,GovernorWB,GovernorWR,GovernorWP] },
    { modelo: 'KOSAL', negras: [KosalBK, KosalBQ, KosalBN, KosalBB, KosalBR, KosalBP], blancas: [KosalWK, KosalWQ, KosalWN, KosalWB, KosalWR, KosalWP] },
    { modelo: 'LEIPZIG', negras : [LeipzigBK,LeipzigBQ,LeipzigBN,LeipzigBB,LeipzigBR,LeipzigBP], blancas : [LeipzigWK,LeipzigWQ,LeipzigWN,LeipzigWB,LeipzigWR,LeipzigWP] },
    { modelo: 'MPCHESS', negras: [MpchessBK, MpchessBQ, MpchessBN, MpchessBB, MpchessBR, MpchessBP], blancas: [MpchessWK, MpchessWQ, MpchessWN, MpchessWB, MpchessWR, MpchessWP] },
    { modelo: 'PIXEL', negras : [PixelBK,PixelBQ,PixelBN,PixelBB,PixelBR,PixelBP], blancas : [PixelWK,PixelWQ,PixelWN,PixelWB,PixelWR,PixelWP] },
    { modelo: 'MAESTRO', negras: [MaestroBK, MaestroBQ, MaestroBN, MaestroBB, MaestroBR, MaestroBP], blancas: [MaestroWK, MaestroWQ, MaestroWN, MaestroWB, MaestroWR, MaestroWP] },
    { modelo: 'ANARCANDY', negras : [AnarcandyBK,AnarcandyBQ,AnarcandyBN,AnarcandyBB,AnarcandyBR,AnarcandyBP], blancas : [AnarcandyWK,AnarcandyWQ,AnarcandyWN,AnarcandyWB,AnarcandyWR,AnarcandyWP] },
  ];

  const piezasChunks = chunkArray(piezasPreview, chunkSizePiezas);
  const emotesChunks = chunkArray(emotesPreview, chunkSizeEmotes);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const addEmote = (emote) => {
    setEmotesSelected(prevEmotes => {
      const newEmotes = [...prevEmotes.slice(1), emote];
      return newEmotes.length > 4 ? newEmotes.slice(0, 4) : newEmotes;
    });
  };

  return(
    <div className="fondoPersonalizacion">
      {/* Menú desplegable (sideBar) */}
      <div className={showSidebar ? "sidePersonalizacion open" : "sidePersonalizacion"}>
        <SideBar setShowSidebar={setShowSidebar}/>
      </div>
      <div className="titlePersonalizacion">
        {/* Botón para desplegar el sidebar */}
        <button className={!showSidebar ? "sideMenuButtonPersonalizacion" : "sideMenuButtonPersonalizacion hidden"} 
          onClick={() => setShowSidebar(true)}>
          <MenuIcon sx={{
            color: '#fff',
            backgroundColor: 'transparent',
            height: 52,
            width: 52,
          }} />
        </button>
        {/* Título de la página */}
        <h1 className="pageTitlePersonalizacion">PERSONALIZACION</h1>
      </div>
      <div className="containerPersonalizacion">
        <div className="containerPersonalizacion center">
          <div className="menuDeslizante">
            {/* Contenido a mostrar (piezas / emoticonos) */}
            <div>
              <button className={rewardShowing == 'piezas' ? "contenidoButton selected" : "contenidoButton"}
                onClick={() => setRewardShowing('piezas')}>
                  Piezas
              </button>
              <button className={rewardShowing == 'emoticonos' ? "contenidoButton selected" : "contenidoButton"} 
                onClick={() => setRewardShowing('emoticonos')}>
                  Emoticonos
              </button>
            </div>
            {/* Mensajes informativos cuando se muestran piezas/emoticonos */}
            {rewardShowing === 'piezas' ? (
              <div style={{textDecoration: 'underline'}}>
                Selecciona un aspecto para las piezas
              </div>
            ) : (
              <div style={{textDecoration: 'underline'}}>
                Selecciona hasta 4 emoticonos para usar en el chat de partida
              </div>
            )}
            {/* Eleccion de piezas / Emoticonos */}
            {rewardShowing === 'piezas' ? (
              /* Listado de aspectos de piezas */
              <div className="menuDeslizanteContenido">
                {piezasChunks[currentPage - 1]?.map((piezas, i) => (
                  <button key={i} className={`listadoPiezas ${fichasSelected === piezas.modelo ? 'selected' : ''}`}
                    onClick={() => setFichasSelected(piezas.modelo)}>
                    <div className="modeloPiezas">
                      {piezas.modelo}
                    </div>
                    <div className="familiaPiezas">
                      {piezas.blancas.map((blancas, index) => (
                        <img key={index} className="piezasIndividuales" src={blancas} />
                      ))}
                    </div>
                    <div className="familiaPiezas">
                      {piezas.negras.map((negras, index) => (
                        <img key={index} className="piezasIndividuales" src={negras} />
                      ))}
                    </div>
                  </button>
                ))}
              </div> 
            ) : (
              /* Listado de emoticonos */
              <div className="menuDeslizanteContenido">
                {emotesChunks[currentPage - 1]?.map((emotes, i) => (
                  <button key={i} className={`listadoEmotes ${emotesSelected.find(selected => selected == emotes) ? 'selected' : ''}`}
                    onClick={() => addEmote(emotes)}>
                    {emotes}
                  </button>
                ))}
              </div> 
            )}
            {/* Botones para cambiar de páginas */}
            {rewardShowing === 'piezas' ? (
              <div className="menuDeslizantePagina">
                <Pagination
                  count={piezasChunks.length}
                  page={currentPage}
                  onChange={handleChangePage}
                  color="primary"
                />
              </div>
            ) : (
              <div className="menuDeslizantePagina">
                <Pagination
                  count={emotesChunks.length}
                  page={currentPage}
                  onChange={handleChangePage}
                  color="primary"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personalizacion;