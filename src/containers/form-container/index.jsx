import React, { useState } from 'react';
import FormFirstRow from '../../components/form-first-row';
import FormSecondRow from '../../components/form-second-row';
import FormLabelGenerator from '../../components/form-label-generator';
import { paymentValueLabelEnum, subscriptionTypesEnum } from '../../constants';
import { currencyCodes } from '../../constants/currency-codes';
import './styles.css'

const initialFormData = {
    initialPrice: 0,
    paymentValue: 0, 
    billingFrequencyValue: null,
    billingFrequencyCounter: 0,
    trialPeriodValue: '',
    trialPeriodTypeValue: null,
    durationType: 'Never Ends',
    billingCycles: '',
}

const FormContainer = () => {
    const [formData, setFormData] = useState(initialFormData);

    const handleFormDataChange = (formDataKey, formDataValue) => {
        const isBillingFrequencySelect = formDataKey === 'billingFrequencyValue';
        const auxFormData = { ...formData, [formDataKey]: formDataValue };

        if(isBillingFrequencySelect && !formData.paymentValue) {
            auxFormData.paymentValue = formData.initialPrice;
        }

        setFormData(auxFormData);
    }

    const timeIntervalBuilder = () => {
        if(formData.trialPeriodValue && formData.trialPeriodTypeValue) {
            const trialPeriodType = (formData.trialPeriodValue > 1 ? formData.trialPeriodTypeValue : formData.trialPeriodTypeValue.slice(0, -1));
            return `${formData.trialPeriodValue} ${trialPeriodType}`.toLowerCase();
        }
        return '';
    }

    const subscriptionTypeBuilder = () => {
        const isInvalid = !formData.durationType || !formData.trialPeriodTypeValue || !formData.billingFrequencyValue || !formData.paymentValue;
        if(isInvalid) {
            return null;
        }
        if(formData.durationType === 'Never Ends') {
            return formData.trialPeriodTypeValue !== 'None' 
                ? subscriptionTypesEnum.TrialAndNeverEndingSubs 
                : subscriptionTypesEnum.NoTrialAndNeverEndingSubs
        }

        return formData.trialPeriodTypeValue !== 'None' 
            ? subscriptionTypesEnum.TrialAndEndingSubs 
            : subscriptionTypesEnum.NoTrialAndEndingSubs;
    }

    const billingPeriodBuilder = () => {
        if(!formData.billingFrequencyValue || !formData.billingFrequencyCounter) {
            return '';
        } else {
            const billingTypeSingle = formData.billingFrequencyValue.slice(0, -1);
            const currentBillingType = formData.billingFrequencyCounter > 1 
                ? formData.billingFrequencyValue 
                : billingTypeSingle;
            return `${formData.billingFrequencyCounter} ${currentBillingType}`.toLowerCase()
        }
    }

    const formatNumberToCurrency = (numberWithDecimalPoint = 0.00) => {
        const Language = window.navigator.language;
        const CurrencyCodePerLanguage = currencyCodes[Language.split('-')[1]];

        const formatConfig = { 
            style: 'currency', 
            currency: CurrencyCodePerLanguage, 
            currencyDisplay: 'narrowSymbol' }

        const currencyFormatter = new Intl.NumberFormat( window.navigator.language, formatConfig);

        return currencyFormatter.format(numberWithDecimalPoint);
    }

    const getBillingTotalAmountPaid = () => {
        let amountPaid = formData.paymentValue;
        if(!!formData.billingCycles) {
            amountPaid = amountPaid * formData.billingCycles;
        }

        if(!!formData.initialPrice) {
            amountPaid = amountPaid + formData.initialPrice;
        }

        return formatNumberToCurrency(amountPaid)
    }

    return (
        <div className='form-container'>
            <main>
                <FormFirstRow 
                    onChangeInput={handleFormDataChange} 
                    initialPriceValue={formData.initialPrice} 
                    paymentValue={formData.paymentValue}
                    billingFrequencyValue={formData.billingFrequencyValue}
                    billingFrequencyCounter={formData.billingFrequencyCounter}
                    paymentValueLabel={paymentValueLabelEnum[formData.billingFrequencyValue] || ''}
                />
                <FormSecondRow 
                    onChangeInput={handleFormDataChange} 
                    trialPeriodValue={formData.trialPeriodValue} 
                    trialPeriodTypeValue={formData.trialPeriodTypeValue} 
                    durationTypeValue={formData.durationType}
                    billingCyclesValue={formData.billingCycles}
                />
                <FormLabelGenerator 
                    trialTimeInterval={timeIntervalBuilder()} 
                    subscriptionType={subscriptionTypeBuilder()} 
                    initialPrice={formatNumberToCurrency(formData.initialPrice)} 
                    paymentAmount={formatNumberToCurrency(formData.paymentValue)} 
                    billingPeriod={billingPeriodBuilder()}
                    billingCycles={formData.billingCycles}
                    totalAmountPaid={getBillingTotalAmountPaid()}
                />
            </main> 
        </ div>
    )
}

export default FormContainer;