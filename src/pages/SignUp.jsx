
import React, { useState } from 'react';
import '../styles/SignUp.css';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Tooltip, Typography } from '@mui/material';
const apiUrl = process.env.REACT_APP_API_URL;

function SignUp({ updateUserInfo }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [segundaPassword, setSegundaPassword] = useState('');
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/home');
  }
  const labelColorStyle = {
    color: 'white',
  };

  const [error, setError] = useState('');
  const handleSignUp = async () => {
    try {
      const response = await fetch(`${apiUrl}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre:username, contraseña:password, correoElectronico:email}),
      });
      if (response.ok) {
        // Si la solicitud es exitosa, inicia sesión con la nueva cuenta
        console.log("usuario creado correctamente, Iniciando sesion ...");
        try {
          const responseLogin = await fetch(`${apiUrl}/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: username, contraseña: password }),
            timeout: 10000, // Tiempo de espera de 10 segundos (10000 milisegundos)
          });
          const parseRes = await responseLogin.json();
          if (responseLogin.ok) {
            console.log("id de la sesión: ",parseRes.userId)
            updateUserInfo({ field : "loggedIn", value : true }); // Marca que el usuario tiene sesión iniciada 
            updateUserInfo({ field : "userId", value : parseRes.userId }); // Actualiza el id del usuario
            navigate('/home');
          } else { // Esto no debería de ocurrir
            if (responseLogin.status === 401) {
              setError('Usuario o contraseña incorrectos');
            } 
            else {
              setError('Error desconocido, por favor intenta de nuevo');
            }
          }
        } catch (error) {
          console.error('Error de red:', error);
          if (error instanceof TypeError && error.message === 'Failed to fetch') {
            setError('Error de red: No se pudo conectar al servidor');
          } else {
            setError('Error de red, por favor intenta de nuevo');
          }
        }
      } else {
        // Si la solicitud falla, muestra un mensaje de error
        console.error('Error al registrarse');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className='mainContainerSignup'>
      <div className='wrapperSignup'>
        <div>
          {/* Botón para volver al menú principal */}
          <button className='titleButtonSignup' onClick={handleClick}>
            {/* Hint para el botón */}
            <Tooltip title="Volver al menú principal">
              <h1 className='titleSignup'>ChessHub</h1>
            </Tooltip>
          </button>
        </div>
        <div className="formSignup">
          <h3 className='formTitleSignup'><u>Crear Cuenta</u></h3>
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
              id="email"  
              label="Correo electronico" 
              variant="outlined" 
              value={email}
              color="warning" /* Color del borde */
              InputLabelProps={{
                style: labelColorStyle,
              }}
              InputProps={{
                style: { color: 'white' } // Change text color to white
              }}
              onChange={(e) => setEmail(e.target.value)}
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
          {/* Input para repertir la contraseña */}
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
          {/* Botón para proceder al signup */}
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