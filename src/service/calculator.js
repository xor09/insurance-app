export const investmentCalculator = (initialAmount, currentAge, tillAge, profitRatio) => {
    const years = tillAge - currentAge;
    const months = years * 12;
    const investmentPerMonth = initialAmount / months;
    const finalAmount = +initialAmount + (initialAmount * profitRatio / 100.0);
    return [years, investmentPerMonth.toFixed(2), finalAmount];
};