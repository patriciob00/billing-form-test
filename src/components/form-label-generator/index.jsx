import React from 'react'
import { subscriptionTypesEnum } from '../../constants';
import './styles.css'

const FormLabelGenerator = ({ 
    initialPrice = null, 
    paymentAmount = null, 
    billingPeriod, 
    trialTimeInterval = null,
    billingCycles = null,
    totalAmountPaid = null,
    subscriptionType = null,
}) => {
    const buildNoTrialAndNeverEndingSubsTemplate = () => {
        return `Your customer will be charged ${initialPrice} immediately and then
        ${paymentAmount} every ${billingPeriod} until they cancel.`
    };

    const buildNoTrialAndEndingSubsTemplate = () => {
        return `Your customer will be charged ${initialPrice} immediately, 
        and then ${paymentAmount} every ${billingPeriod}, ${billingCycles} times. 
        The total amount paid will be ${totalAmountPaid}.`
    };
    
    const buildTrialAndNeverEndingSubsTemplate = () => {
        return `Your customer will be charged ${initialPrice} immediately for their ${trialTimeInterval} trial, 
        and then ${paymentAmount} every ${billingPeriod} until they cancel.`
    };

    const buildTrialWithEndingSubsTemplate = () => {
        return `Your customer will be charged ${initialPrice} immediately for their ${trialTimeInterval} trial, 
        and then ${paymentAmount} every ${billingPeriod}, ${billingCycles} times. 
        The total amount paid will be ${totalAmountPaid}.`
    };

    const labelGenerator = () => {
        switch(subscriptionType) {
            case subscriptionTypesEnum.NoTrialAndNeverEndingSubs:
                return buildNoTrialAndNeverEndingSubsTemplate();
            case subscriptionTypesEnum.NoTrialAndEndingSubs:
                return buildNoTrialAndEndingSubsTemplate();
            case subscriptionTypesEnum.TrialAndNeverEndingSubs:
                return buildTrialAndNeverEndingSubsTemplate();
            case subscriptionTypesEnum.TrialAndEndingSubs:
                return buildTrialWithEndingSubsTemplate();
        }
    };

    const Content = () => {
        return !subscriptionType ? null : (
            <div className='label-generator-content' aria-label="label-content">
                {labelGenerator()}
            </ div>
        )
    }
    
    return (
        <Content />
    )
}

export default FormLabelGenerator;