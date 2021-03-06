import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { auth, facebook, google } from '../firebase/firebase';
import '../styles/Auth.scss';

SignUp.propTypes = {};

function SignUp(props) {
    const [data, setData] = useState({ Email: '', Password: '', FirstName: '', DisplayName: '', Phone: '' });
    let history = useHistory();
    const firstName = document.getElementById('firstName');
    const displayName = document.getElementById('displayName');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    function onChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    function setErrorFor(input, message) {
        const formControl = input.parentElement;
        const messageErr = formControl.querySelector('.message-error');
        formControl.className = 'login__form-input error';
        messageErr.innerText = message;
    }

    function setSuccessFor(input) {
        const formControl = input.parentElement;
        formControl.className = 'login__form-input success';
    }

    function isPhone(phone) {
        return /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(phone);
    }

    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    const trySignUp = async () => {
        var flagFirstName = false, flagDisplayName = false, flagPhone = false, flagEmail = false, flagPassword = false;
        var firstNameValue = firstName.value.trim();
        var displayNameValue = displayName.value.trim();
        var phoneValue = phone.value.trim();
        var emailValue = email.value.trim();
        var passwordValue = password.value.trim();

        if (!firstNameValue) {
            setErrorFor(firstName, 'H??? kh??ng ???????c ????? tr???ng');
        } else {
            setSuccessFor(firstName);
            flagFirstName = true;
        }

        if (!displayNameValue) {
            setErrorFor(displayName, 'T??n kh??ng ???????c ????? tr???ng');
        } else {
            setSuccessFor(displayName);
            flagDisplayName = true;
        }

        if (!phoneValue) {
            setErrorFor(phone, 'S??? ??i???n tho???i kh??ng ???????c ????? tr???ng');
        } else if (!isPhone(phoneValue)) {
            setErrorFor(phone, 'S??? ??i???n tho???i kh??ng h???p l???. Vui l??ng nh???p l???i');
        } else {
            setSuccessFor(phone);
            flagPhone = true;
        }

        if (!emailValue) {
            setErrorFor(email, 'Email kh??ng ???????c ????? tr???ng');
        } else if (!isEmail(emailValue)) {
            setErrorFor(email, 'Email kh??ng h???p l??. Vui l??ng nh???p l???i');
        } else {
            setSuccessFor(email);
            flagEmail = true;
        }

        if (!passwordValue) {
            setErrorFor(password, 'M???t kh???u kh??ng ???????c ????? tr???ng');
        } else if (passwordValue.length < 6) {
            setErrorFor(password, 'M???t kh???u ph???i c?? ??t nh???t 6 k?? t???');
        } else {
            setSuccessFor(password);
            flagPassword = true;
        }

        if (flagFirstName === true && flagDisplayName === true && flagPhone === true && flagEmail === true && flagPassword === true) {
            auth.createUserWithEmailAndPassword(data.Email, data.Password).catch((err) => {
                setData("");
                switch (err.code) {
                    case "auth/email-already-in-use":
                        alert(err.message);
                        break;
                    default:
                        alert("????ng k?? th???t b???i");
                }
                history.push('/login');
                alert('????ng k?? th??nh c??ng');
            });
        }

    };

    const trySignInWithGoogle = async () => {
        auth.signInWithPopup(google).catch((err) => {
            switch (err.code) {
                default:
                    alert("????ng nh???p th???t b???i");
            }
        });
        history.push('/');
        alert('????ng nh???p th??nh c??ng');
    };

    const trySignInWithFacebook = async () => {
        auth.signInWithPopup(facebook).catch((err) => {
            switch (err.code) {
                default:
                    alert("????ng nh???p th???t b???i");
            }
        });
        history.push('/');
        alert('????ng nh???p th??nh c??ng');
    };

    return (
        <div id="login">
            <div className="container">
                <div className="row direct">
                    <ul className="direct__list">
                        <li className="direct__item">
                            <Link to="/" className="direct__link">Trang ch???</Link>
                            <i className="fas fa-angle-right"></i>
                        </li>
                        <li className="direct__item">
                            <span className="direct__text">????ng k?? t??i kho???n</span>
                        </li>
                    </ul>
                </div>
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6">
                        <div className="login__tittle">????NG K?? T??I KHO???N</div>
                        <div className="login__desc">N???u ch??a c?? t??i kho???n vui l??ng ????ng k?? t???i ????y</div>
                        <div className="login__social">
                            <Link to="/" className="login__social-link" onClick={trySignInWithFacebook}>
                                <img src="./images/login-signup/fb-btn.svg" alt="" />
                            </Link>
                            <Link to="/" className="login__social-link" onClick={trySignInWithGoogle}>
                                <img src="./images/login-signup/gp-btn.svg" alt="" />
                            </Link>
                        </div>
                        <div className="login__form">
                            <div className="login__form-input">
                                <p className="login__form-text">
                                    H???
                                    <span>*</span>
                                </p>
                                <input type="text" className="login__form-in" id="firstName" name="FirstName" value={data.FirstName} onChange={onChange} placeholder="Nh???p H???" />
                                <p className="message-error"></p>
                            </div>
                            <div className="login__form-input">
                                <p className="login__form-text">
                                    T??N
                                    <span>*</span>
                                </p>
                                <input type="text" className="login__form-in" id="displayName" name="DisplayName" value={data.DisplayName} onChange={onChange} placeholder="Nh???p T??n" />
                                <p className="message-error"></p>
                            </div>
                            <div className="login__form-input">
                                <p className="login__form-text">
                                    S??? ??I???N THO???I
                                    <span>*</span>
                                </p>
                                <input type="text" className="login__form-in" id="phone" name="Phone" value={data.Phone} onChange={onChange} placeholder="Nh???p S??? ??i???n tho???i" />
                                <p className="message-error"></p>
                            </div>
                            <div className="login__form-input">
                                <p className="login__form-text">
                                    EMAIL
                                    <span>*</span>
                                </p>
                                <input type="email" className="login__form-in" id="email" name="Email" value={data.Email} onChange={onChange} placeholder="Nh???p ?????a ch??? Email" />
                                <p className="message-error"></p>
                            </div>
                            <div className="login__form-input">
                                <p className="login__form-text">
                                    M???T KH???U
                                    <span>*</span>
                                </p>
                                <input type="password" className="login__form-in" id="password" name="Password" value={data.Password} onChange={onChange} placeholder="Nh???p M???t kh???u" />
                                <p className="message-error"></p>
                            </div>
                            <div className="button">
                                <div className="btns btn__darkwhite login__btn" title="" onClick={trySignUp}>????NG K??</div>
                            </div>
                            <Link to="/login" className="login__form-forget">????NG NH???P</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;