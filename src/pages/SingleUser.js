import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import '../styles/SingleUser.css';

import InfoItem from "../components/InfoItem";
import { fetchUserData } from '../helpers/fetchOneRecord';

const SingleUser = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [nicNumber, setNicNumber] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [familyMembers, setFamilyMembers] = useState([]);
    const [telephoneNumbers, setTelephoneNumbers] = useState([]);

    const fetchSingleUserData = async () => {
        const { name, nic, birthDay, formatTelephoneNumber, formatAddress, formatFamilyMembers } = await fetchUserData(id);
        setName(name);
        setNicNumber(nic);
        setDateOfBirth(birthDay);
        setTelephoneNumbers(formatTelephoneNumber);
        setAddresses(formatAddress);
        setFamilyMembers(formatFamilyMembers);
    }


    useEffect(() => {
        fetchSingleUserData();
    },[id]);

    return(
        <div className="user-data">
            <div className="header">
                <h1>User Data - { name }</h1>
            </div>
            <div className="personal-info">
                <h2>Personal Information</h2>
                <InfoItem label={'Name'} value={name}/>
                <InfoItem label={'NIC Number'} value={nicNumber}/>
                <InfoItem label={'Date of Birth'} value={dateOfBirth}/>
            </div>
            <div className="section">
                <h2>Addresses</h2>
                {addresses.map(address => (
                    <div key={address.id} className="address-item">
                        <p>
                            <span className="address-value">
                                {address.addressLine1}, {address.addressLine2}, {address.city}, {address.country}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
            <div className="section">
                <h2>Family Members</h2>
                {familyMembers.map(familyMember => (
                    <div key={familyMember.id} className="family-member-item">
                        <p><strong>Name:</strong> {familyMember.name}</p>
                    </div>
                ))}
            </div>
            <div className="section">
                <h2>Telephone Numbers</h2>
                {telephoneNumbers.map(telephone => (
                    <div key={telephone.id} className="telephone-item">
                        <p><strong>Number:</strong> {telephone.number}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SingleUser;