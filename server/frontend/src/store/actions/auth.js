import axios from 'axios';
import * as actionTypes from './actionTypes';




export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    const token = localStorage.getItem('token');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    axios.get('http://127.0.0.1:8000/logout/', {
        headers: {
          'Authorization': `Token ${token}`
        }
    }).catch(err => {
        switch (err.response.status) {
            case 401:
                // user already logged out
                break;
            case 500:
                alert(err);
                break;
            default:
                console.log(err);
                break;
        }
    })

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationDate => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        }, expirationDate * 1000) // converting exp to milli
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/login/', {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.token;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch (err => {
            if(err.response.status === 400){
                dispatch(authFail({
                    message: "Wrong email or password"
                }))
            } else {
                dispatch(authFail(err))
            }
            
        })
    }
}

export const authRegister = (username, password, password2) => {
    return dispatch => {
        dispatch(authStart());
        if(password !== password2){
            dispatch(authFail({message: "Passwords must match"}))
        } else {
        axios.post('http://127.0.0.1:8000/register/', {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.token;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch (err => {
            dispatch(authFail(err))
        })
    }
    }
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token === undefined){
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if( expirationDate <= new Date()){
                dispatch(logout());
            } else {
                dispatch(authSuccess(token))
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    }
}