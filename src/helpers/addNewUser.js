import axios from "axios";

export const addNewUser = async (name, dateOfBirth, nicNumber, mobileNumbers, familyMembers, addresses) => {
    try{
        let modifiedNumbers = [];
        let modifiedFamilyMembers = [];
        let birthDayArr = dateOfBirth.toString().split(' ');
        let modifiedBirthDate = `${birthDayArr[1]} ${birthDayArr[2]} ${birthDayArr[3]}`;

        mobileNumbers.forEach(number => {
            modifiedNumbers.push({
                "number": number.toString()
            });
        });

        familyMembers.forEach(member => {
            modifiedFamilyMembers.push({
                "name": member
            });
        });

        let customer = {
            name: name,
            dateOfBirth: modifiedBirthDate,
            nicNumber: nicNumber,
            telephoneNumbers: [...modifiedNumbers],
            addresses: [...addresses],
            familyMembers: [...modifiedFamilyMembers]
        }

        console.log(customer)
        await axios.post(`http://localhost:8080/api/customers`, customer);

    }catch (err){
        console.error(err)
    }
}