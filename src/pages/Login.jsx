import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/home');
  }

  const handleLogin = async () => {
    navigate('/home');
    try {
      const response = await fetch('http://tu_backend_url/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
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
    <div className='mainContainer'>
      <div className='wrapper'>
          {/*<h1 className='title'>ChessHub</h1>*/}
        <div>
          <button className='title' onClick={handleClick}>ChessHub</button>
        </div>
        <div className="form-login">
          <h3>Inicio de Sesión</h3>
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
              sx={{input: {color: 'white'}}} /* Color del texto */
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
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
              sx={{input: {color: 'white'}}} /* Color del texto */
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button 
            variant="contained" 
            onClick={handleLogin} 
            sx={{ padding: '10px 40px' ,
            fontSize: '16px', 
            bgcolor: '#F77F00',
            '&:hover': {background: "#F77F00"}
            }}
          >
            Iniciar sesión
          </Button>
          <a className='registrate' onClick={()=>{navigate('/signup')}}>¿No tienes cuenta? Regístrate</a>
        </div>
      </div>
    </div> 
  );
}

export default Login;
