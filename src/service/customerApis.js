import axios from "axios"
import { format } from "date-fns";

export const getActiveAgents = () => {
    const response = axios.get(`http://localhost:8080/insurenceapp/getallactiveagents`)
    return response;
}

export const purchasePolicy = async (investmentDetail, token) => {
    const formData = new FormData();
    formData.append('investAmount', investmentDetail.investAmount);
    formData.append('totalInstallment', investmentDetail.totalInstallment);
    formData.append('issueDate', investmentDetail.issueDate);
    formData.append('maturityDate', investmentDetail.maturityDate);
    formData.append('premiumType', investmentDetail.premiumType);
    formData.append('premiumAmount', investmentDetail.investmentPerMonth);
    formData.append('sumAssured', investmentDetail.finalAmount);
    formData.append('status', investmentDetail.status);
    formData.append('agent', investmentDetail.agentId);
    formData.append('customer.customerId', investmentDetail.customerid);
    formData.append('insuranceScheme.schemeId', investmentDetail.schemeid);

    investmentDetail.nominees.forEach((nominee, index) => {
        formData.append(`nominees[${index}].nomineeName`, nominee.nomineeName);
        formData.append(`nominees[${index}].nomineeRelation`, nominee.nomineeRelation);
    });

    investmentDetail.documentFiles.forEach(file => {
        formData.append('documentFiles', file);
    });

    const response = await axios.post(`http://localhost:8080/insurenceapp/addpolicy`,formData,{
        headers : {
            Authorization : `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
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

export const askQuestion = async (customerid, query, token) => {
    const response = await axios.post(`http://localhost:8080/insurenceapp/addquery/${customerid}`,
    query,
    {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response
}

export const getPolicies = async (customerid, currentpageno, size, token) => {
    const response = await axios.get(`http://localhost:8080/insurenceapp/getpolicybycustomer/${customerid}`,
    {
        params: {
            pageno: currentpageno-1,
            pagesize : size
        },
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response
}

export const getPaymentByPolicyNo = async (policyid, currentpageno, size) => {
    const response = await axios.get(`http://localhost:8080/insurenceapp/getpayment/${policyid}`,
    {
        params: {
            pageno: currentpageno-1,
            pagesize : size
        }
    })
    return response
}

export const getAllQueriesByCustomerId = async (customerid, currentpageno, size, token) => {
    const response = await axios.get(`http://localhost:8080/insurenceapp/getqueries/${customerid}`,
    {
        params: {
            pageno: currentpageno-1,
            pagesize : size
        },
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response
}

export const applyClaim = async (formData, token) => {
      const response = await axios.post(`http://localhost:8080/insurenceapp/addclaim`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', 
          }
        }
      );
      return response;
  };

  export const getAllClaim = async (policyNo, token) => {
    const response = await axios.get(`http://localhost:8080/insurenceapp/getbypolicynumber/${policyNo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response;
};

