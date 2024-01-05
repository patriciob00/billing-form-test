import React from 'react'
import CustomInputWithMultiplier from '../custom-input-with-multiplier';
import CustomInputWithCurrency from '../custom-input-with-currency';

const selectOptions = ['Days', 'Weeks', 'Months']

const FormFirstRow = ({ 
    initialPriceValue, 
    billingFrequencyValue,
    billingFrequencyCounter,
    paymentValue, 
    paymentValueLabel = '', 
    onChangeInput = () => {} 
}) => {

    return (
        <div className='form-common-row'>
            <CustomInputWithCurrency 
                inputType='text'
                isCurrencyInput
                id="initial-price" 
                label='Initial Price' 
                currentValue={initialPriceValue} 
                size='medium'
                min={0}
                placeholder='0'
                handleChange={({ target: { value }}) => onChangeInput('initialPrice', value)}
            />
            <CustomInputWithMultiplier id="billing-frequency" 
                label='Billing Frequency' 
                inputType='select' 
                selectOptions={selectOptions} 
                size='medium'
                value={billingFrequencyValue}
                multiplierValue={billingFrequencyCounter}
                multiplierOnChange={({ target: { value }}) => onChangeInput('billingFrequencyCounter', value)}
                onChange={({ target: { value }}) => onChangeInput('billingFrequencyValue', value)}
            />
            <CustomInputWithCurrency 
                id="payment-value"
                inputType='text'
                label={paymentValueLabel} 
                currentValue={paymentValue} 
                size='medium'
                min={0}
                placeholder='0'
                disabled={!billingFrequencyValue}
                handleChange={({ target: { value }}) => onChangeInput('paymentValue', value)}
            />
        </div>
    )
}

export default FormFirstRow;