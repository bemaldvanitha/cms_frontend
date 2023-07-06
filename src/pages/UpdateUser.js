import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, DatePicker, Input } from "antd";

import '../styles/SingleUser.css';

import { fetchUserData } from '../helpers/fetchOneRecord';
import CustomAlert from "../components/CustomAlert";
import { updateExistingUser } from '../helpers/updateExistingUser';

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [nicNumber, setNicNumber] = useState('');
    const [birthDay, setBirthDay] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [familyMembers, setFamilyMembers] = useState([]);
    const [telephoneNumbers, setTelephoneNumbers] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const fetchSingleUserData = async () => {
        let updatedAddress = [];
        const { name, nic, birthDay, formatTelephoneNumber, formatAddress, formatFamilyMembers } = await fetchUserData(id);

        formatAddress.forEach(addr => {
            const address = {
                id: addr.id,
                addressLine1: addr.addressLine1,
                addressLine2: addr.addressLine2,
            }
            updatedAddress.push(address);
        });

        setName(name);
        setNicNumber(nic);
        setDateOfBirth(birthDay);
        setTelephoneNumbers(formatTelephoneNumber);
        setAddresses(updatedAddress);
        setFamilyMembers(formatFamilyMembers)
    }

    useEffect(() => {
        fetchSingleUserData();
    },[id]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDateOfBirthChange = (date) => {
        setBirthDay(date);
    };

    const handleMobileNumberChange = (index, e) => {
        const updatedMobileNumbers = [...telephoneNumbers];
        updatedMobileNumbers[index].number = e.target.value;
        setTelephoneNumbers(updatedMobileNumbers);
    };

    const handleFamilyMemberChange = (index, e) => {
        const updatedFamilyMembers = [...familyMembers];
        updatedFamilyMembers[index].name = e.target.value;
        setFamilyMembers(updatedFamilyMembers);
    };

    const handleAddressChange = (index, key, value) => {
        const updatedAddresses = [...addresses];
        updatedAddresses[index][key] = value;
        setAddresses(updatedAddresses);
    };

    const handleSubmit = async () => {
        setShowAlert(false);
        if (name.trim() === '' || name.length < 4) {
            setShowAlert(true);
        }else{
            try{
                await updateExistingUser(id, name, birthDay, dateOfBirth, nicNumber, telephoneNumbers, addresses, familyMembers);
                navigate('/dashboard');
            }catch (err){
                console.error(err);
            }
        }
    };

    return(
        <div className="form-container">
            {showAlert && <CustomAlert description={'Name, Birth date are required'}/>}

            <div className="form-row">
                <Input placeholder={"enter your name"} id="name" value={name} onChange={handleNameChange} />
            </div>

            <div className="form-row cus-row">
                <DatePicker placeholder={'select your birth day'} id="dateOfBirth" value={birthDay}
                            onChange={handleDateOfBirthChange} />
                <span className={'birthday'}>{ dateOfBirth }</span>
            </div>

            <div className="form-row">
                {telephoneNumbers.map((number, index) => {
                    return(
                        <div key={index} className="form-row-inner">
                            <Input placeholder={'enter your mobile phone number'} value={number.number}
                                   onChange={(e) => handleMobileNumberChange(index, e)}/>
                        </div>
                    )
                })}
            </div>

            <div className="form-row">
                {familyMembers.map((member, index) => {
                    return(
                        <div key={index} className="form-row-inner">
                            <Input placeholder={'enter family member name'} value={member.name}
                                   onChange={(e) => handleFamilyMemberChange(index, e)}/>
                        </div>
                    )
                })}
            </div>

            <div className="form-row">
                {addresses.map((address, index) => (
                    <div key={index} className="form-address">
                        <div className="form-address-row">
                            <Input value={address.addressLine1} onChange={(e) => handleAddressChange(index, 'addressLine1', e.target.value)} placeholder="Address Line 1" />
                        </div>
                        <div className="form-address-row">
                            <Input value={address.addressLine2} onChange={(e) => handleAddressChange(index, 'addressLine2', e.target.value)} placeholder="Address Line 2" />
                        </div>
                    </div>
                ))}
            </div>

            <Button onClick={handleSubmit} className={'customer-button'}>Submit</Button>
        </div>
    )
}

export default UpdateUser;