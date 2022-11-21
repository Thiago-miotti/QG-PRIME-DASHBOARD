import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {Stack, IconButton, InputAdornment, TextField, Snackbar} from '@mui/material';
import {Alert, LoadingButton} from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import {useAuth} from "../../../context/AuthProvider";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login } = useAuth();

  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const superSecretPassword = 'Amazon@2022%'

  const handleClick = () => {
      if(passwordValue === superSecretPassword){
          login({ 'isLoggedIn': true, token: Math.random().toString(36).substr(2)})
      }
      else {
          setShowAlert(true)
      }
  };

  return (
    <>
        <Snackbar open={showAlert} autoHideDuration={4000} onClose={() => setShowAlert(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert onClose={() => setShowAlert(false)} severity="error" sx={{ width: '100%' }}>
                Senha incorreta.
            </Alert>
        </Snackbar>
      <Stack spacing={2}>
        <TextField
          name="password"
          label="Código de entrada"
          type={showPassword ? 'text' : 'password'}
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} sx={{mt: 3}}>
        Entrar
      </LoadingButton>
    </>
  );
}
