
import React, { useState } from 'react';
import '../styles/SignUp.css';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Tooltip, Typography } from '@mui/material';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [segundaPassword, setSegundaPassword] = useState('');
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/home');
  }

  const labelColorStyle = {
    color: 'white',
  };

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
        <div>
          <button className='title-button' onClick={handleClick}>
            <Tooltip title="Volver al menú principal">
              <h1 className='title'>ChessHub</h1>
            </Tooltip>
          </button>
        </div>
        <div className="form-signup">
          <h3 className='form-title'><u>Crear Cuenta</u></h3>
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
              color="warning" /* Color del borde */
              InputLabelProps={{
                style: labelColorStyle,
              }}
              InputProps={{
                style: { color: 'white' } // Change text color to white
              }}
              onChange={(e) => setSegundaPassword(e.target.value)}
            />
          </Box>
          <Button 
            variant="contained" 
            onClick={handleSignUp} 
            sx={{ padding: '10px 40px' ,
            fontSize: '16px', 
            bgcolor: '#F77F00',
            '&:hover': {background: "#F77F00"}
            }}
            color='warning'
          >
            Registrarse
          </Button>
        </div>
      </div>
    </div> 
  );
}

export default SignUp;
