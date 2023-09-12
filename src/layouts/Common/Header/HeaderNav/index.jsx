import React from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import styles from './HeaderNav.module.scss';
import classNames from 'classnames/bind';
import { navigationItems } from '../../../../utils/mockData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
const cx = classNames.bind(styles);

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <NavLink
        to="/"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        className={cx('nav-item-link')}
    >
        {children}
        <FontAwesomeIcon icon={faChevronDown} className={cx('icon')}></FontAwesomeIcon>
    </NavLink>
));

const NavItem = ({ navItem }) => {
    const { id, name, subnavList } = navItem;
    return (
        <>
            {subnavList ? (
                <Dropdown className={cx('nav-item')}>
                    <Dropdown.Toggle as={CustomToggle}>{name}</Dropdown.Toggle>
                    <Dropdown.Menu className={cx('subnav-list')}>
                        {subnavList.map((item) => {
                            const { id, name } = item;
                            return (
                                <Dropdown.Item key={id} className={cx('dropdown-item')}>
                                    <div >{name}</div>
                                </Dropdown.Item>
                            );
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            ) : (
                <div className={cx('nav-item')}>
                    <Link to="/collections" className={cx('nav-item-link')}>
                        {name}
                    </Link>
                </div>
            )}
        </>
    );
};

const Headernav = () => {
    return (
        <Row className={cx('header-nav')}>
            <Col xl={10} className={cx('nav-list', 'd-flex')}>
                {navigationItems.map((item) => (
                    <NavItem key={item.id} navItem={item} />
                ))}
            </Col>
        </Row>
    );
};

export default Headernav;
