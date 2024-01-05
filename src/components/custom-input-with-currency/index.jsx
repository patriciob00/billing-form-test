import React from 'react';
import CustomInput from '../custom-input';
import { currencyCodes } from '../../constants/currency-codes';
import IntlCurrencyInput from 'react-intl-currency-input';
import './styles.css';


const CustomInputWithCurrency = ({ currentValue = 0, handleChange = () => {}, ...props}) => {

    const language = window.navigator.language;
    const currencyCode = currencyCodes[language.split('-')[1]]

    const currencyConfig = {
        locale: language,
        formats: {
            number: {
                [currencyCode]: {
                    style: "currency",
                    currency: currencyCode,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                },
            },
        },
    }

    const changeValue = (event, value) => {
        event.preventDefault();
        handleChange({ target: { value }})
    }

    return (
        <CustomInput customClass="custom-input-with-currency" 
            {...props}
            hideInput
        >
            <IntlCurrencyInput aria-label={props.id} id={props.id} currency={currencyCode} value={currentValue} config={currencyConfig} onChange={changeValue} />
        </CustomInput>
    )
}

export default CustomInputWithCurrency;