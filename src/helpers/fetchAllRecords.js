import axios from "axios";

export const fetchData = async () => {
    try{
        const response = await axios.get('http://localhost:8080/api/customers');
        const customersList = response.data;
        let newCustomerList = [];
        customersList.forEach((cus) => {
            let customer = {
                ...cus,
                date_of_birth: cus.dateOfBirth,
                nic_number: cus.nicNumber
            }
            newCustomerList.push(customer);
        });
        return { newCustomerList };
    }catch (err){
        console.error(err);
    }
}