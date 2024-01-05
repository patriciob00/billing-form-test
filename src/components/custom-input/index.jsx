import React from 'react'
import './styles.css';

const CustomInput = ({ 
    id, 
    label = '', 
    inputType = 'text', 
    placeholder = '', 
    onChange = () => {}, 
    value = '',
    size = 'small',
    selectOptions = [],
    children = null,
    isCurrencyInput,
    currencySign = '$',
    customClass = '',
    customStyle = {},
    hideInput = false,
    ...props
}) => {

    const handleInputSize = () => {
        switch(size) {
            case 'small':
                return 'input-sm';        
            case 'medium':
                return 'input-md';
            case 'large':
                return 'input-lg';

            default:
                return 'input-sm';
        }
    }

    const selectOptionsBuilder = () => {
        return selectOptions.map( option =>
            <option key={option} value={option}>{option}</option>
        )
    }

    return (
        <div className={`custom-input-container ${customClass} ${handleInputSize()}`} style={customStyle}>
            <label htmlFor={id}>{label}</ label>
            <div className='input-row'>
                { children && children}
                {!hideInput && inputType !== 'select' && 
                    <input
                        min={0}
                        name={id}
                        id={id}
                        aria-label={id}
                        type={inputType} 
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        {...props}
                    />
                }
                {!hideInput && inputType === 'select' && 
                    <select aria-label={id} name={id} onChange={onChange} {...props}>
                        { !value && <option value={null} hidden></option>}
                        {selectOptionsBuilder()}
                    </select>
                }
            </div>
        </div>
    )
}

export default CustomInput;