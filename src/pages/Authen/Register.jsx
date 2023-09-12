import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

import { useFirebase } from '../../contexts/FirebaseContext';
import styles from './Authen.module.scss';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { getAuth, createUserWithEmailAndPassword,signInWithPopup } from "firebase/auth";

const cx = classNames.bind(styles);
const Register = () => {
    const auth = getAuth()
    const {userCollection} = useFirebase()
    const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
        // Xử lý Log In bằng Google
    const { GoogleProvider } = useFirebase()    
    const logInwithGoogle =  async (event) => {
        event.preventDefault()
        const userCredential =  await signInWithPopup(auth, GoogleProvider)  
        const {displayName, email, phoneNumber, photoURL} = userCredential.user
        const id = userCredential.user.uid
        const docRef = await setDoc( doc(db, "users", id) ,{
            displayName,
            email,
            password: "",
            phoneNumber,
            photoURL,
            address: {
                province: '',
                district: '',
                ward: '',
                houseNumber: ''
            },  
          }, { merge: true })
        } 
    
        //Xử lý Register bằng email và passowrd
    // const [account, setAccount] = useState({})
    const validation = useFormik({
        initialValues: {
            displayName: '',
            email: '',
            password: '',
            phoneNumber: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
            .email("Invalid email format")
            .required("Required!"),
            password: Yup.string()
            .required("Required!")
            .min(6, "Password must have at least 6 characters"),
            displayName: Yup.string()
            .required("Required!"),
            phoneNumber: Yup.string()
            .required("Required!")
            .matches(phoneRegExp, "Invalid phone number")
        }),
        onSubmit: (values) => {
            const createAccount = async () => {
                        const {displayName, email, password, phoneNumber} = values
                        const userCredential = await createUserWithEmailAndPassword(auth, email,  password)
                        const id = userCredential.user.uid
                        const docRef = await setDoc( doc(db, "users", id) ,{
                            displayName,
                            email,
                            password,
                            phoneNumber,
                            address: {
                                province: '',
                                district: '',
                                ward: '',
                                houseNumber: ''
                            },
                            photoURL: "",   
                          }, { merge: true })
                    }
                    createAccount()
        }
    })

    // const handleChangeEmail = (event) => {
    //     setAccount({...account, email: event.target.value})
    // }
    // const handleChangePassword = (event) => {
    //     setAccount({...account, password: event.target.value})
    // }
    const handleRegister = (event) => {
        event.preventDefault()
        validation.handleSubmit()
        // if (account.email && account.password) {
        //     const createAccount = async () => {
        //         const userCredential = createUserWithEmailAndPassword(auth, account.email,  account.password)
        //         const user = userCredential.user;
        //         console.log(user)
        //     }
        //     createAccount()
        // }
    }

    return (
        <Container className={cx('wrapper')}>
            <form className={cx('inner')}>
                <h2 className={cx('heading')}>Đăng ký tài khoản Beyours</h2>
                <div className={cx('form-input')}>
                    <Input 
                    placeholder="Họ và tên" 
                    type="text" 
                    name="displayName"
                    value={validation.values.displayName}
                    onChange={validation.handleChange}
                    inValid={validation.errors.displayName}
                    istouched = {validation.touched.displayName ? 1 : undefined}
                    />
                    <Input 
                        placeholder="Địa chỉ email" 
                        type="email" 
                        name="email"
                        value={validation.values.email}
                        onChange={validation.handleChange}
                        inValid={validation.errors.email}
                        istouched = {validation.touched.email ? 1 : undefined}
                    />
                    <Input 
                        placeholder="Số điện thoại" 
                        type="tel"
                        name="phoneNumber"
                        value={validation.values.phoneNumber}
                        onChange={validation.handleChange}
                        inValid={validation.errors.phoneNumber}
                        istouched = {validation.touched.phoneNumber ? 1 : undefined}
                    />
                    <Input 
                        placeholder="Mật khẩu" 
                        type="password" 
                        name="password"
                        value={validation.values.password}
                        onChange={validation.handleChange}
                        inValid={validation.errors.password}
                        istouched = {validation.touched.password ? 1 : undefined}
                    />
                </div>
                <div className={cx('form-controls')}>
                    <div>
                        <span>Bạn đã có tài khoản?</span>
                        <Button className={cx('register')} to="/login">
                            Đăng nhập
                        </Button>
                    </div>
                    <Button className={cx('submit-btn')} type="submit" onClick={handleRegister} primary large>
                        Đăng ký
                    </Button>
                    <div>
                        <Button
                            leftIcon={<FontAwesomeIcon icon={faGoogle} />}
                            rounded
                            text
                            className={cx('continue-with-google')}
                            onClick={logInwithGoogle}
                        >
                            Tiếp tục với Google
                        </Button>
                        <Button
                            leftIcon={<FontAwesomeIcon icon={faFacebook} />}
                            rounded
                            text
                            className={cx('continue-with-facebook')}
                        >
                            Tiếp tục với Facebook
                        </Button>
                    </div>
                </div>
            </form>
        </Container>
    );
};

export default Register;
