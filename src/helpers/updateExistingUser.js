import axios from "axios";

export const updateExistingUser = async (id, name, birthDay, dateOfBirth, nicNumber, telephoneNumbers, addresses, familyMembers) => {
    try{
        let modifiedBirthDate = '';

        if(birthDay !== null){
            let birthDayArr = birthDay.toString().split(' ');
            modifiedBirthDate = `${birthDayArr[1]} ${birthDayArr[2]} ${birthDayArr[3]}`;
        }else {
            modifiedBirthDate = dateOfBirth;
        }

        let customer = {
            name: name,
            dateOfBirth: modifiedBirthDate,
            nicNumber: nicNumber,
            telephoneNumbers: telephoneNumbers,
            addresses: addresses,
            familyMembers: familyMembers
        }

        console.log(customer);
        await axios.patch(`http://localhost:8080/api/customers/${id}`, customer);
    }catch (err){
        console.error(err);
    }
}