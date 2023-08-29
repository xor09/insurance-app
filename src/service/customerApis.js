import axios from "axios"

export const getActiveAgents = () => {
    const response = axios.get(`http://localhost:8080/insurenceapp/getallactiveagents`)
    return response;
}

export const purchasePolicy = async (investmentDetail, token) => {
    console.log(investmentDetail)
    const data = {
        investAmount : investmentDetail.investAmount,
        totalInstallment : investmentDetail.totalInstallment,
        issueDate : investmentDetail.issueDate,
        maturityDate : investmentDetail.maturityDate,
        premiumType : investmentDetail.premiumType,
        premiumAmount : investmentDetail.investmentPerMonth,
        sumAssured : investmentDetail.finalAmount,
        status : investmentDetail.status,
        agent : investmentDetail.agentId,
        customer : {
            customerId : investmentDetail.customerid
        },
        insuranceScheme : {
            schemeId : investmentDetail.schemeid
        },
        nominees : investmentDetail.nominees
    }

    const response = await axios.post(`http://localhost:8080/insurenceapp/addpolicy`,data,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })

    return response;
}

export const payInstallment = async (policyNo, date, cardType, amount, tax, finalAmount, token) => {

    const response = await axios.post(`http://localhost:8080/insurenceapp/addpayment`,{
        policyId : policyNo,
        paymentType : cardType,
        amount : amount,
        date : date,
        tax : tax,
        totalPayment : finalAmount
    },{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })

    return response;
}

