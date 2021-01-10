import react from 'react';
import { bool, string, func } from 'prop-types';
import '../scss/textInput.scss';


const TextInput = ({ name ,value, setValue, isPassword }) => {

    return (
        <label>
        <div className="text-white label">
            {name}
    </div>
        <input className="text-input" value={value} onChange={(e) => setValue(e.target.value)} type={isPassword ? 'password' : 'text'} name={name} />
    </label>
    );
}



TextInput.propTypes = {
    name: string.isRequired,
    value: string,
    setValue: func.isRequired,
    isPassword: bool.isRequired,
  }

export default TextInput;