import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Input, DatePicker, Button } from 'antd';

import '../styles/CreateUser.css';

import { addNewUser } from '../helpers/addNewUser';
import CustomAlert from "../components/CustomAlert";
import AddDataFromExcel from "../components/AddDataFromExcel";

const CreateUser = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [nicNumber, setNicNumber] = useState('');
    const [mobileNumbers, setMobileNumbers] = useState([]);
    const [familyMembers, setFamilyMembers] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDateOfBirthChange = (date) => {
        setDateOfBirth(date);
    };

    const handleNicNumberChange = (e) => {
        setNicNumber(e.target.value);
    };

    const handleMobileNumberChange = (index, e) => {
        const updatedMobileNumbers = [...mobileNumbers];
        updatedMobileNumbers[index] = e.target.value;
        setMobileNumbers(updatedMobileNumbers);
    };

    const handleAddMobileNumber = () => {
        setMobileNumbers([...mobileNumbers, '']);
    };

    const handleRemoveMobileNumber = (index) => {
        const updatedMobileNumbers = [...mobileNumbers];
        updatedMobileNumbers.splice(index, 1);
        setMobileNumbers(updatedMobileNumbers);
    };

    const handleFamilyMemberChange = (index, e) => {
        const updatedFamilyMembers = [...familyMembers];
        updatedFamilyMembers[index] = e.target.value;
        setFamilyMembers(updatedFamilyMembers);
    };

    const handleAddFamilyMember = () => {
        setFamilyMembers([...familyMembers, '']);
    };

    const handleRemoveFamilyMember = (index) => {
        const updatedFamilyMembers = [...familyMembers];
        updatedFamilyMembers.splice(index, 1);
        setFamilyMembers(updatedFamilyMembers);
    };

    const handleAddressChange = (index, key, value) => {
        const updatedAddresses = [...addresses];
        updatedAddresses[index][key] = value;
        setAddresses(updatedAddresses);
    };

    const handleAddAddress = () => {
        setAddresses([...addresses, { addressLine1: '', addressLine2: '', city: '', country: '' }]);
    };

    const handleRemoveAddress = (index) => {
        const updatedAddresses = [...addresses];
        updatedAddresses.splice(index, 1);
        setAddresses(updatedAddresses);
    };

    const handleSubmit = async () => {
        setShowAlert(false);
        if (name.trim() === '' || name.length < 4 || dateOfBirth === null || nicNumber.trim() === '' || nicNumber.length < 4) {
            setShowAlert(true);
        }else{
            try{
                await addNewUser(name, dateOfBirth, nicNumber, mobileNumbers, familyMembers, addresses);
                navigate('/dashboard');
            }catch (err){
                console.error(err);
            }
        }
    };

    return(
        <div>
            <AddDataFromExcel/>
            <div className="form-container">
                {showAlert && <CustomAlert description={'Name, Birth date, NIC number are required'}/>}

                <div className="form-row">
                    <Input placeholder={"enter your name"} id="name" value={name} onChange={handleNameChange} />
                </div>

                <div className="form-row">
                    <DatePicker placeholder={'select your birth day'} id="dateOfBirth" value={dateOfBirth}
                                onChange={handleDateOfBirthChange} />
                </div>

                <div className="form-row">
                    <Input placeholder={'enter your NIC number'} id="nicNumber" value={nicNumber}
                           onChange={handleNicNumberChange} />
                </div>

                <div className="form-row">
                    {mobileNumbers.map((number, index) => (
                        <div key={index} className="form-row-inner">
                            <Input placeholder={'enter your mobile phone number'} value={number}
                                   onChange={(e) => handleMobileNumberChange(index, e)} />
                            <Button onClick={() => handleRemoveMobileNumber(index)}>Remove</Button>
                        </div>
                    ))}
                    <div className={'button-container'}>
                        <Button className={'customer-button'} onClick={handleAddMobileNumber}>Add Mobile Number</Button>
                    </div>
                </div>

                <div className="form-row">
                    {familyMembers.map((member, index) => (
                        <div key={index} className="form-row-inner">
                            <Input placeholder={'enter family member name'} value={member}
                                   onChange={(e) => handleFamilyMemberChange(index, e)} />
                            <Button onClick={() => handleRemoveFamilyMember(index)}>Remove</Button>
                        </div>
                    ))}
                    <div className={'button-container'}>
                        <Button className={'customer-button'} onClick={handleAddFamilyMember}>Add Family Member</Button>
                    </div>
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
                            <div className="form-address-row">
                                <Input value={address.city} onChange={(e) => handleAddressChange(index, 'city', e.target.value)} placeholder="City" />
                                <Input value={address.country} onChange={(e) => handleAddressChange(index, 'country', e.target.value)} placeholder="Country" />
                                <Button onClick={() => handleRemoveAddress(index)}>Remove</Button>
                            </div>
                        </div>
                    ))}
                    <Button onClick={handleAddAddress} className={'customer-button'}>Add Address</Button>
                </div>

                <Button onClick={handleSubmit} className={'customer-button'}>Submit</Button>
            </div>
        </div>
    )
}

export default CreateUser;