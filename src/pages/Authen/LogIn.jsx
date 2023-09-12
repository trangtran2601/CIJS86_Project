import React, { useEffect, useRef, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from 'classnames/bind';
import styles from './Authen.module.scss';
import Button from '../../components/Button';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useFirebase } from '../../contexts/FirebaseContext';
import { getAuth, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import Input from '../../components/Input';

const cx = classNames.bind(styles);
const LogIn = () => {

    const validation = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
            .email("Invalid email format")
            .required("Required!"),
          password: Yup.string()
            .required("Required!")
        }),
        onSubmit: (values) => {
            const email = values.email
            const password = values.password
            const logIn = async () => {
              try {
                  const userCredential = await signInWithEmailAndPassword(auth, email, password)
                  console.log(userCredential.user)
              } catch (error) {
                  console.log(error)
              }
            }
            logIn()
        }
    })
    const auth = getAuth()
    //Xử lý Log In bằng Google
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
    //Xử lý Log In bằng email & password
    const handleLogIn = (event) => {
        event.preventDefault()
        validation.handleSubmit()                
        }  
                  
    return (
        <Container className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h2 className={cx('heading')}>Đăng nhập</h2>
                <div className={cx('form-input')}>
                    <Input
                    name="email"
                    value={validation.values.email}
                    onChange={validation.handleChange}
                    inValid={validation.errors.email}
                    istouched = {validation.touched.email ? 1 : undefined}
                    placeholder="Địa chỉ email" 
                    type="email"
                    />
                    <Input
                    name="password"
                    value={validation.values.password}
                    onChange={validation.handleChange}
                    inValid = {validation.errors.password}
                    istouched = {validation.touched.email ? 1 : undefined}
                    placeholder="Mật khẩu" 
                    type="password" 
                    />
                </div>
                <div className={cx('form-controls')}>
                    <div>
                        <span>Bạn chưa có tài khoản?</span>
                        <Button className={cx('register')} to="/register">
                            Đăng ký
                        </Button>
                    </div>
                    <div>
                        <Button className={cx('forgot-password')}>Quên mật khẩu?</Button>
                    </div>
                    <Button className={cx('submit-btn')} primary large onClick={handleLogIn} type="submit">
                        Đăng nhập
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
            </div>
        </Container>
    );
};

export default LogIn;
