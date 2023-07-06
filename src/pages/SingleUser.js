import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

import '../styles/SingleUser.css';

const SingleUser = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [nicNumber, setNicNumber] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [familyMembers, setFamilyMembers] = useState([]);
    const [telephoneNumbers, setTelephoneNumbers] = useState([]);

    const fetchUserData = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/api/customers/${id}`);
            const data = response.data;

            setName(data.name);
            setDateOfBirth(data.dateOfBirth);
            setNicNumber(data.nicNumber);

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
            setAddresses(formatAddress);

            let formatFamilyMembers = [];
            data.familyMembers.forEach(family => {
                const familyMember = {
                    id: family.id,
                    name: family.name
                }
                formatFamilyMembers.push(familyMember);
            });
            setFamilyMembers(formatFamilyMembers);

            let formatTelephoneNumber = [];
            data.telephoneNumbers.forEach(tele => {
                const phone = {
                    id: tele.id,
                    number: tele.number
                }
                formatTelephoneNumber.push(phone);
            });
            setTelephoneNumbers(formatTelephoneNumber);
            //console.log(name, nicNumber, dateOfBirth, addresses, familyMembers, telephoneNumbers)
        }catch (err){
            console.error(err);
        }
    }

    useEffect(() => {
        fetchUserData();
    },[id]);

    return(
        <div className="user-data">
            <div className="header">
                <h1>User Data - { name }</h1>
            </div>
            <div className="personal-info">
                <h2>Personal Information</h2>
                <div className="info-item">
                    <p className="info-label">Name</p>
                    <p className="info-value">{name}</p>
                </div>
                <div className="info-item">
                    <p className="info-label">NIC Number</p>
                    <p className="info-value">{nicNumber}</p>
                </div>
                <div className="info-item">
                    <p className="info-label">Date of Birth</p>
                    <p className="info-value">{dateOfBirth}</p>
                </div>
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