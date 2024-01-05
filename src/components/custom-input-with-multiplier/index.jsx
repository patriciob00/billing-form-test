import React from 'react';
import CustomInput from '../custom-input';
import './styles.css'

const CustomInputWithMultiplier = ({ 
    multiplierValue = 0, 
    multiplierOnChange = () => {},
    multiplierDisabled = false,
    ...props 
}) => {
    return <CustomInput {...props}>
        <input min={0} disabled={multiplierDisabled} className='multiplier-input' type='number' value={multiplierValue} onChange={multiplierOnChange} />
    </CustomInput>
}

export default CustomInputWithMultiplier;