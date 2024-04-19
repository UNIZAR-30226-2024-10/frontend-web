import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
const apiUrl = process.env.REACT_APP_API_URL;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/home');
  }

  const labelColorStyle = {
    color: 'white',
  };

  const handleLogin = async () => {
    navigate('/home');
    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre:username, contraseña:password }),
      });

      if (response.ok) {
        // Si la solicitud es exitosa, redirige a la página de inicio
        navigate('/home');
      } else {
        // Si la solicitud falla, muestra un mensaje de error
        console.error('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className='mainContainerLogin'>
      <div className='wrapperLogin'>
        <div>
          {/* Botón para volver al menú principal */}
          <button className='titleButtonLogin' onClick={handleClick}>
            {/* Hint para el botón */}
            <Tooltip title="Volver al menú principal">
              <h1 className='titleLogin'>ChessHub</h1>
            </Tooltip>
          </button>
        </div>
        <div className="formLogin">
          <h3 className='formTitleLogin'><u>Inicio de Sesión</u></h3>
          {/* Input para el nombre de usuario */}
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="username"
              label="Nombre de usuario"
              variant="outlined"
              value={username}
              color="warning" /* Color del borde */
              InputLabelProps={{
                style: labelColorStyle,
              }}
              InputProps={{
                style: { color: 'white' } // Change text color to white
              }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          {/* Input para la contraseña */}
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="password"
              label="Contraseña"
              type="password"
              variant="outlined"
              value={password}
              color="warning" /* Color del borde */
              InputLabelProps={{
                style: labelColorStyle,
              }}
              InputProps={{
                style: { color: 'white' } // Change text color to white
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          {/* Botón para proceder al login */}
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              padding: '10px 40px',
              fontSize: '16px',
              bgcolor: '#F77F00',
              '&:hover': { background: "#F77F00" }
            }}
          >
            Iniciar sesión
          </Button>
          {/* Botón para acceder a signup */}
          <a className='registrateLogin' onClick={() => { navigate('/signup') }}>¿No tienes cuenta? Regístrate</a>
        </div>
      </div>
    </div>
  );
}

export default Login;