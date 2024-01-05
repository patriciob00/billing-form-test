import React from 'react'
import CustomInput from '../custom-input';
import CustomInputWithMultiplier from '../custom-input-with-multiplier';

const trialPeriodOptions = ['None', 'Days', 'Weeks', 'Months'];
const durationOptions = ['Never Ends', 'Customize']

const FormSecondRow = ({ 
    trialPeriodValue, 
    trialPeriodTypeValue, 
    durationTypeValue, 
    billingCyclesValue,
    onChangeInput = () => {}
}) => {
    return (
        <div className='form-common-row'>
            <CustomInputWithMultiplier 
                id='trial-period' 
                label='Trial Period' 
                inputType='select'
                size='medium'
                value={trialPeriodTypeValue}
                multiplierValue={trialPeriodValue}
                selectOptions={trialPeriodOptions}
                multiplierDisabled={trialPeriodTypeValue === 'None' || trialPeriodTypeValue === null}
                multiplierOnChange={({ target: { value }}) => onChangeInput('trialPeriodValue', value)}
                onChange={({ target: { value }}) => onChangeInput('trialPeriodTypeValue', value)}
                
            />
            <CustomInput 
                id="duration-input" 
                label='Duration' 
                inputType='select' 
                selectOptions={durationOptions} 
                size='medium'
                value={durationTypeValue}
                onChange={({ target: { value }}) => onChangeInput('durationType', value)}
            />
            <CustomInput
                id="billing-cycles" 
                label='Billing Cycles'
                size='medium'
                min={0}
                inputType='number'
                value={billingCyclesValue}
                placeholder='0'
                customStyle={{ opacity: durationTypeValue === 'Never Ends' ? 0 : 1 }}
                onChange={({ target: { value }}) => onChangeInput('billingCycles', value)}
            />
        </div>
    )
}

export default FormSecondRow;