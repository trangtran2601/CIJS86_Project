import classNames from 'classnames/bind';
import styles from './User.module.scss';
import Popper from '../../../../../components/Popper';
import Tippy from '@tippyjs/react/headless';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import  Button  from '../../../../../components/Button';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const User = () => {
    const navigate = useNavigate()
    const auth= getAuth(); 
    const handleLogOut = async () => {
        signOut(auth)
    }
    useEffect(() => {
        onAuthStateChanged(auth, () => {
            navigate("/")
        })
    },[])
    return (
        <Tippy
    
            interactive
            render={(attrs) => (
                <div className={cx('wrapper')} tabIndex={-1} {...attrs}>
                    <Popper>
                        {auth.currentUser ? (
                            <>
                                <Button className={cx('option-item')} onClick={handleLogOut}>
                                    Đăng xuất
                                </Button>
                                <Button  className={cx('option-item')}>
                                    Thông tin tài khoản
                                </Button>
                                <Button className={cx('option-item')} to={`/ordertracking/${auth.currentUser.uid}`}>
                                    Kiểm tra đơn hàng
                                </Button>
                            </>
                        ) : (
                            <Button className={cx('option-item')} to="/login">
                                Đăng nhập
                            </Button>
                        )}
                    </Popper>
                </div>
            )}
        >
            <div className="user-wrap">
                <FontAwesomeIcon icon={faUser} />
            </div>
        </Tippy>
    );
};

export default User;
