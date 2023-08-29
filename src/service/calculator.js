export const investmentCalculator = (initialAmount, years, profitRatio) => {
    const months = years * 12;
    const investmentPerMonth = initialAmount / months;
    profitRatio = profitRatio/100;
    const finalAmount = +initialAmount * Math.pow(1 + profitRatio, years);
    return [investmentPerMonth.toFixed(2), finalAmount.toFixed(2), months];
};

export const calculatePayAmount = (amount, taxPercentage) => {
    const taxAmount = amount*taxPercentage/100;
    const finalAmount = amount+taxAmount
    return finalAmount.toFixed(2);
}

export const calculateAgentCommission = (amount, ratio) => {
    const commission = ((ratio)*amount)/100 ;
    return commission.toFixed(2);
}