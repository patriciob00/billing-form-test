import { fireEvent, render, screen } from "@testing-library/react";

import FormContainer from ".";

describe("Form-container", () => {
    it('Renders Form container component', () => {
        render(<FormContainer />);
        const selectInputList = screen.getAllByRole('combobox');
        const numberInputList = screen.getAllByRole('spinbutton');
        const textInputList = screen.getAllByRole('textbox');
        expect(selectInputList.length + numberInputList.length + textInputList.length).toBe(8)
    })

    it('Changing initial price value', () => {
        render(<FormContainer />);
        const initialPriceInput = screen.getByLabelText('initial-price');
        expect(String(initialPriceInput.value).replace(/[^0-9.]/g, '')).toBe("0.00");
        fireEvent.change(initialPriceInput, { target: { value: 23 }});
        expect(String(initialPriceInput.value).replace(/[^0-9.]/g, '')).toBe("0.23");
    })

    it('Payment Value should has same value as Initial price when empty', () => {
        render(<FormContainer />);
        const initialPriceInput = screen.getByLabelText('initial-price');
        const frequencyBillingSelect = screen.getByLabelText('billing-frequency');
        const paymentValueInput = screen.getByLabelText('payment-value');
        fireEvent.change(initialPriceInput, { target: { value: 230 }});
        expect(String(initialPriceInput.value).replace(/[^0-9.]/g, '')).toBe("2.30");
        fireEvent.change(frequencyBillingSelect, { target: { value: 'Months' }});
        expect(String(paymentValueInput.value).replace(/[^0-9.]/g, '')).toBe("2.30");
    })

    it('Testing generated label with initial price and never ending billing', () => {
        const labelGenerated = 'Your customer will be charged $20.00 immediately and then $20.00 every 2 months until they cancel.'

        render(<FormContainer />);
        const initialPriceInput = screen.getByLabelText('initial-price');
        const frequencyBillingSelect = screen.getByLabelText('billing-frequency');
        const trialPeriodInput = screen.getByLabelText('trial-period');
        const billingDurationInput = screen.getByLabelText('duration-input');
        const [billingFrequencyValueInput, TrialPeriodValue, BillingCyclesInput] = screen.getAllByRole('spinbutton');
        
        fireEvent.change(initialPriceInput, { target: { value: 2000 }});
        fireEvent.change(billingFrequencyValueInput, { target: { value: 2 }});
        fireEvent.change(frequencyBillingSelect, { target: { value: 'Months' }});
        fireEvent.change(trialPeriodInput, { target: { value: 'None' }});
        fireEvent.change(billingDurationInput, { target: { value: 'Never Ends' }});

        const labelGenerator = screen.getByLabelText('label-content');

        expect(labelGenerator).toHaveTextContent(labelGenerated);
    })

    it('Testing generated label with initial price and billing cycles', () => {
        const labelGenerated = 'Your customer will be charged $20.00 immediately, and then $20.00 every 2 months, 2 times. The total amount paid will be $60.00.'

        render(<FormContainer />);
        const initialPriceInput = screen.getByLabelText('initial-price');
        const frequencyBillingSelect = screen.getByLabelText('billing-frequency');
        const trialPeriodInput = screen.getByLabelText('trial-period');
        const billingDurationInput = screen.getByLabelText('duration-input');
        const [billingFrequencyValueInput, TrialPeriodValue, BillingCyclesInput] = screen.getAllByRole('spinbutton');
        
        fireEvent.change(initialPriceInput, { target: { value: 2000 }});
        fireEvent.change(billingFrequencyValueInput, { target: { value: 2 }});
        fireEvent.change(frequencyBillingSelect, { target: { value: 'Months' }});
        fireEvent.change(trialPeriodInput, { target: { value: 'None' }});
        fireEvent.change(billingDurationInput, { target: { value: 'Customize' }});
        fireEvent.change(BillingCyclesInput, { target: { value: 2 }});

        const labelGenerator = screen.getByLabelText('label-content');


        expect(labelGenerator).toHaveTextContent(labelGenerated);
    })

    it('Testing generated label with initial price and billing cycles and trial period', () => {
        const generatedLabel = 'Your customer will be charged $20.00 immediately for their 7 days trial, and then $20.00 every 2 months, 2 times. The total amount paid will be $60.00.'

        render(<FormContainer />);
        const initialPriceInput = screen.getByLabelText('initial-price');
        const frequencyBillingSelect = screen.getByLabelText('billing-frequency');
        const trialPeriodInput = screen.getByLabelText('trial-period');
        const billingDurationInput = screen.getByLabelText('duration-input');
        const [billingFrequencyValueInput, TrialPeriodValue, BillingCyclesInput] = screen.getAllByRole('spinbutton');
        
        fireEvent.change(initialPriceInput, { target: { value: 2000 }});
        fireEvent.change(billingFrequencyValueInput, { target: { value: 2 }});
        fireEvent.change(frequencyBillingSelect, { target: { value: 'Months' }});
        fireEvent.change(TrialPeriodValue, { target: { value: 7 }});
        fireEvent.change(trialPeriodInput, { target: { value: 'Days' }});
        fireEvent.change(billingDurationInput, { target: { value: 'Customize' }});
        fireEvent.change(BillingCyclesInput, { target: { value: 2 }});

        const labelGenerator = screen.getByLabelText('label-content');


        expect(labelGenerator).toHaveTextContent(generatedLabel);
    })

    it('Testing generated label with initial price and no billing cycles and trial period', () => {
        const generatedLabel = 'Your customer will be charged $20.00 immediately for their 7 days trial, and then $20.00 every 2 months until they cancel.'

        render(<FormContainer />);
        const initialPriceInput = screen.getByLabelText('initial-price');
        const frequencyBillingSelect = screen.getByLabelText('billing-frequency');
        const trialPeriodInput = screen.getByLabelText('trial-period');
        const billingDurationInput = screen.getByLabelText('duration-input');
        const [billingFrequencyValueInput, TrialPeriodValue] = screen.getAllByRole('spinbutton');
        
        fireEvent.change(initialPriceInput, { target: { value: 2000 }});
        fireEvent.change(billingFrequencyValueInput, { target: { value: 2 }});
        fireEvent.change(frequencyBillingSelect, { target: { value: 'Months' }});
        fireEvent.change(TrialPeriodValue, { target: { value: 7 }});
        fireEvent.change(trialPeriodInput, { target: { value: 'Days' }});
        fireEvent.change(billingDurationInput, { target: { value: 'Never Ends' }});

        const labelGenerator = screen.getByLabelText('label-content');


        expect(labelGenerator).toHaveTextContent(generatedLabel);
    })
})