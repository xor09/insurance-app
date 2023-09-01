import { addDays, addMonths, format, parseISO } from "date-fns";

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

export const calculateAgentCommission = (amount, percentage) => {
    const commission = ((percentage)*amount)/100 ;
    return commission.toFixed(2);
}


export const calculateNextInstallmentDate = (initialDate, daysToAdd, monthsToAdd) => {
    const parsedInitialDate = parseISO(initialDate); // Parse the initial date string
    let newDate = addMonths(parsedInitialDate, monthsToAdd);
    newDate = addDays(newDate, daysToAdd);
    const formattedDate = format(newDate, 'dd-MM-yyyy');
    return formattedDate;
  }