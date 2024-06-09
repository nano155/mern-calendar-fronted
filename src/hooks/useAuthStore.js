import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";
import { onLogoutCalendar } from "../store/calendar/calendarSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const {
        data: { loginUser },
      } = await calendarApi.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", loginUser.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ name: loginUser.name, uid: loginUser.uid }));
    } catch (error) {
      console.log(error);
      dispatch(onLogout("Credenciales incorrectas!"));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    try {
      const {
        data: { newUser },
      } = await calendarApi.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", newUser.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ name: newUser.name, uid: newUser.uid }));
    } catch (error) {
      dispatch(
        onLogout(
          error.response.data.error?.password.msg ||
            error.response?.data.msg ||
            "--"
        )
      );
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () =>{
    try {
        const {data} = await calendarApi.get('/auth/renew')

        localStorage.setItem('token', data.token)
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(onLogin({name:data.name, uid:name.uid}))

    } catch (error) {
        localStorage.clear()
        dispatch(onLogout())   
    }

  }

  const startLogout = async () =>{
    try {
        await calendarApi.get('/auth/clear-cookie')
        dispatch(onLogoutCalendar())
        dispatch(onLogout())
        
    } catch (error) {
        console.log(error);
    }
  }

  return {
    //* Propiedades
    status,
    user,
    errorMessage,

    //* Metodos
    startLogin,
    startRegister,
    checkAuthToken, 
    startLogout
  };
};
