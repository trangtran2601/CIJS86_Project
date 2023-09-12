import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './HeaderTop.module.scss';
import Cart from './Cart';
import User from './User';
import HeaderSearch from './HeaderSearch';


const cx = classNames.bind(styles);
const HeaderTop = () => {
    return (
        <Row className={cx('header-top')}>
            <Col xs={5} md={3}>
                {/* <img src="images/logo.png" alt="logo" /> */}
            </Col>
            <HeaderSearch />
            <Col xs={4} md={3} className={cx('header-authen', 'd-flex')}>
                <User />
                <Cart />
            </Col>
        </Row>
    );
};

export default HeaderTop;
