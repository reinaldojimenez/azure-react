import {createContext, useState, useContext, useEffect} from 'react';
import {loginRequest, logoutRequest, verifyTokenRequest, generarQRRequest} from './../api/auth';
import cookies from 'js-cookie'

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ( {children }) => {

    const [user, setUser] = useState(null);    
    const [isAuthenticated, setIsAuthenticated] = useState(false);    
    const [errors, setErrors] = useState([]);    
    const [loading, setLoading] = useState(true);    
    const [imageQR, setImageQR] = useState('');    
    

    const signin = async (user) => {
        try {
            const respuesta = await loginRequest(user);
            setIsAuthenticated(true);
            setUser(respuesta.data);
        } catch (error) {
            console.log(error.response.data)
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]); //convertimos a un arreglo el objeto message
        }
    }

    const generarQR = async (data) => {
        try {
            const respuesta = await generarQRRequest(data);
            //console.log(respuesta.data.qr)
            setImageQR(respuesta.data.qr)                     
            //return respuesta.data;
        } catch (error) {
            console.log(error.response.data)
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]); //convertimos a un arreglo el objeto message
        }
    }

    const logout = () => {        
        cookies.remove("token")
        setIsAuthenticated(false)
        setUser(null)
    }

    useEffect(() => {
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer); //quita el timer
        }
    }, [errors]);

    useEffect(() => { //hacemos una consulta al backend
        async function checkLogin() {            
            const listaCookies = cookies.get();
            if (!listaCookies.token){
                console.log("No existe el Token")
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
                return;
            }            
            try {
                const respuesta = await verifyTokenRequest(listaCookies.token);
                console.log(respuesta)
                if(!respuesta.data) {
                    setIsAuthenticated(false); 
                    setLoading(false);
                    return;
                }                

                setIsAuthenticated(true);
                setUser(respuesta.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null)
                setLoading(false);
            }
            
        }
        checkLogin();
    }, []); //cuando inicie la aplicacion (cuando se recarga)

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            errors,
            signin,
            loading,
            logout,
            generarQR,
            imageQR,
        }}>            
            { children }
        </AuthContext.Provider>
    );
}