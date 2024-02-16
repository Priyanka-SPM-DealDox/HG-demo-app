import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../src/assets/css/login/Auth.css';
import { useAuthContext } from "../../src/hooks/useAuthContext";
import {baseUrl} from '../config';



function Auth() {

    const { user } = useAuthContext();
    console.log(user);

    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [secret, setSecret] = useState('');
    const [otp, setOtp] = useState('');
    const [qrCodeGenerated, setQrCodeGenerated] = useState(false);

    console.log(qrCodeUrl);
    console.log(secret);
    console.log(otp);


    useEffect(() => {
        generateQRCode();
    }, []);

    const generateQRCode = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/admin/qrcode`);
            setQrCodeUrl(response.data.data);
            setSecret(response.data.secret.ascii);
            setQrCodeGenerated(true); // Set the state to indicate QR code generation
        } catch (error) {
            console.log('Error generating QR code:', error);
        }
    };


    const validateOTP = async () => {

        try {
            const response = await fetch(`${baseUrl}/api/admin/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    otp: otp,
                    secret: secret,
                }),
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log(responseData.message);
                window.location.href = '/home';
            } else {
                console.log(responseData.error); // Log the error message
                window.location.href = '/auth';
            }
        } catch (error) {
            console.log('Error validating OTP:', error); // Log the error
        }
    };

    return (
        <div id="formtag">
            {qrCodeGenerated && (
                <div>
                    <p id="qr_instruction">Please scan the QR code to verify use <strong>google authenticator</strong></p>
                    <img id="img_code" src={qrCodeUrl} alt="QR Code" />

                    <input
                        id="qr_code"
                        type="text"
                        placeholder="Enter OTP from Google Authenticator"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button id="valid_otp_button" onClick={validateOTP}>
                        Validate OTP
                    </button>
                </div>
            )}
        </div>
    )
}

export default Auth