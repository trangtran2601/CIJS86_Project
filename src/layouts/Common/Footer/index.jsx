import React from 'react';
import { Container } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <footer className={cx('wrapper')}>
            <Container className={cx('inner')}>
               
            </Container>
        </footer>
    );
};

export default Footer;
