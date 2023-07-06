import axios from "axios";

export const fetchUserData = async (id) => {
    try{
        const response = await axios.get(`http://localhost:8080/api/customers/${id}`);
        const data = response.data;

        const name = data.name;
        const birthDay = data.dateOfBirth;
        const nic = data.nicNumber;

        let formatAddress = [];
        data.addresses.forEach(addr => {
            const address = {
                id: addr.id,
                addressLine1: addr.addressLine1,
                addressLine2: addr.addressLine2,
                city: addr.city.name,
                country: addr.country.name
            }
            formatAddress.push(address)
        });

        let formatFamilyMembers = [];
        data.familyMembers.forEach(family => {
            const familyMember = {
                id: family.id,
                name: family.name
            }
            formatFamilyMembers.push(familyMember);
        });

        let formatTelephoneNumber = [];
        data.telephoneNumbers.forEach(tele => {
            const phone = {
                id: tele.id,
                number: tele.number
            }
            formatTelephoneNumber.push(phone);
        });

        return { name, birthDay, nic, formatAddress, formatFamilyMembers, formatTelephoneNumber }
    }catch (err){
        console.error(err);
    }
}