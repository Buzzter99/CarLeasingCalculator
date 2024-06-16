document.addEventListener('DOMContentLoaded', function () {
    //get all elements from the dom
    const carValueInput = document.getElementById('car-value');
    const downPaymentInput = document.getElementById('down-payment');
    const carValueSlider = document.getElementById('car-value-slider');
    const downPaymentSlider = document.getElementById('down-payment-slider');
    const leasePeriodSelect = document.getElementById('lease-period');
    const carTypeSelect = document.getElementById('car-type');

    function calculateLeasingDetails() {
        //validate inputs
        let carValue = parseFloat(carValueInput.value);
        const downPaymentPercentage = parseFloat(downPaymentInput.value);
        const leasePeriod = parseInt(leasePeriodSelect.value);
        if (isNaN(carValue) || carValue < 10000 || carValue > 200000) {
            alert('Car value must be between €10,000 and €200,000!');
            return;
        }
        if (isNaN(downPaymentPercentage) || downPaymentPercentage < 10 || downPaymentPercentage > 50) {
            alert('Down payment percentage must be between 10% and 50%!');
            return;
        }
        if (isNaN(leasePeriod) || leasePeriod < 12 || leasePeriod > 60) {
            alert('Lease period must be between 12 and 60 months!');
            return;
        }
        //calculate if car is brand new or used
        let interestRate = 0;
        if (carTypeSelect.value === 'brand-new') {
            interestRate = 2.99;
        } else if (carTypeSelect.value === 'used') {
            interestRate = 3.7;
        } else {
            alert('Invalid car type.');
            return;
        }

        //calculate leasing details(summary content)
        const downPaymentAmount = carValue * (downPaymentPercentage / 100);
        const monthlyInterestRate = interestRate / 100 / 12;
        const totalLeasingCost = carValue + (carValue * monthlyInterestRate * leasePeriod);
        const monthlyInstallment = (totalLeasingCost - downPaymentAmount) / leasePeriod;
        //assign values to the dom
        document.querySelector('p#total-leasing-cost').textContent = `Total Leasing Cost: €${totalLeasingCost.toFixed(2)}`;
        document.querySelector('p#down-payment-result').textContent = `Down Payment: €${downPaymentAmount.toFixed(2)}`;
        document.querySelector('p#monthly-installment').textContent = `Monthly Installment: €${monthlyInstallment.toFixed(2)}`;
        document.querySelector('p#interest-rate').textContent = `Interest Rate: ${interestRate}%`;
    }
    //add listeners
    carValueInput.addEventListener('change', function () {
        carValueSlider.value = carValueInput.value;
        calculateLeasingDetails();
    });

    downPaymentInput.addEventListener('change', function () {
        downPaymentSlider.value = downPaymentInput.value;
        calculateLeasingDetails();
    });

    carValueSlider.addEventListener('input', function () {
        carValueInput.value = carValueSlider.value;
        calculateLeasingDetails();
    });

    downPaymentSlider.addEventListener('input', function () {
        downPaymentInput.value = downPaymentSlider.value;
        calculateLeasingDetails();
    });

    leasePeriodSelect.addEventListener('change', calculateLeasingDetails);
    carTypeSelect.addEventListener('change', calculateLeasingDetails);
    //calculate on page load(call the function)
    calculateLeasingDetails();
});
