import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
const cx = classNames.bind(styles);
import HeaderTop from './HeaderTop';
import HeaderNav from './HeaderNav'

const Header = () => {
    return (
        <header className={cx('wrapper')}>
            <Container className={cx('inner')}>
                    <HeaderTop />
                    <HeaderNav />
            </Container>
        </header>
    );
};

export default Header;
