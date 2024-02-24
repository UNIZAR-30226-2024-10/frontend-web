import React, { useState } from 'react';
import '../styles/SignUp.css';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [segundaPassword, setSegundaPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://tu_backend_url/signup', {
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
        console.error('Error al registrarse');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className='mainContainer'>
      <div className='wrapper'>
        <h1 className='title'>ChessHub</h1>
        <div className="form-signup">
          <h3>SignUp</h3>
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
              label="Introduzca una contraseña" 
              type="password"
              variant="outlined" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              label="Introduzca la contraseña de nuevo" 
              type="password"
              variant="outlined" 
              value={segundaPassword}
              onChange={(e) => setSegundaPassword(e.target.value)}
            />
          </Box>
          <Button 
            variant="contained" 
            onClick={handleSignUp} 
            sx={{ padding: '10px 40px' ,fontSize: '16px'}} 
            color='primary'
          >
            Registrarse
          </Button>
        </div>
      </div>
    </div> 
  );
}

export default SignUp;
