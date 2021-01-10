import React, { useState, useEffect } from 'react';
import '../scss/login.scss';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/auth';
import { useHistory } from "react-router-dom";
import TextInput from '../../text_inputs/js/textInput';

const Login = (props) => {

    const [register, setRegister] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');



    const history = useHistory();

    useEffect(() => { // to redirect user after sucessful login
      return () => {
        if(!props.loading && !props.error){
            history.push('/');
        }
      };
    }, [props.isAuthenticated])



    const submit = (e) => { // this func handles registration and logging in
        e.preventDefault();
        if (register) { // registring
            props.onRegister(userName, password, password2)
        } else { // for logging in
            props.onAuth(userName, password)
        }
    }





    return (
        <div id="login">
            {props.error && <p className="error-msg label">{props.error.message} </p>}
            {props.isAuthenticated ? <span className="text-white">You are alredy logged in</span> :
                <form onSubmit={submit}>

                    <TextInput name="User" value={userName} setValue={setUserName} isPassword={false}  />
                    <TextInput name="Password" value={password} setValue={setPassword} isPassword={true} />
                    {register && <TextInput name="re-type Password" value={password2} setValue={setPassword2} isPassword={true} />

                    }
                    <div>
                        {props.loading ? <p>loading</p> : <button className="btn" type="submit" value="Submit"> Sumbit </button>}
                    </div>



                    {register ? <div>
                        <button className="btn" type="button" onClick={(e) => setRegister(false)} > Back </ button>
                    </div> : <div>
                            <button className="btn" type="button" onClick={(e) => setRegister(true)} > Register </ button>
                        </div>}
                </form>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
        onRegister: (username, password, password2) => dispatch(actions.authRegister(username, password, password2)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);