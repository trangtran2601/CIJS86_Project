import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import Button from '../../components/Button';
import Overview from '../../components/Overview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../contexts/CartContext';
import { subCategories } from '../../utils/mockData';

const cx = classNames.bind(styles);
const Cart = () => {
    const { cartList, setCartList, cartQuantityAdd, cartQuantityMinus, cartTotalQuantity, cartTotalPrice, handleDeleteProductinCart } = useCart();
    const cartTotal = cartTotalPrice(cartList);
    return (
        <>
            <Overview>
                    <FontAwesomeIcon icon={faHouse} />
                    <span>
                        Giỏ hàng: {cartTotalQuantity(cartList)} sản phẩm - {cartTotal}₫
                    </span>
            </Overview>
            <Container className={cx('cart-content')}>
                {cartList.length === 0 ? (
                    <div className={cx('cart-empty')}>
                        <h4>GIỎ HÀNG</h4>
                        <p>Giỏ hàng trống</p>
                        <p>
                            Tiếp tục mua hàng
                            <Button text>tại đây</Button>
                        </p>
                    </div>
                ) : (
                    <div className={cx('form')}>
                        <table className={cx('cart-table')}>
                            <thead>
                                <tr>
                                    <th colSpan="2">THÔNG TIN CHI TIẾT SẢN PHẨM</th>
                                    <th className={cx('text-left')}>ĐƠN GIÁ</th>
                                    <th className={cx('text-center')}>SỐ LƯỢNG</th>
                                    <th className={cx('text-right')}>TỔNG GIÁ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartList.map((cartIem, index) => {
                                    const {
                                        id,
                                        name,
                                        color,
                                        originalPrice,
                                        discount,
                                        images,
                                        quantity,
                                        subCategoryId,
                                    } = cartIem;
                                    let subCatName = subCategories.find((subCat) => subCat.id === subCategoryId).name;
                                    const PriceInText = (originalPrice * (1 - discount / 100)).toLocaleString('en-US');
                                    const TotalPrice = (originalPrice * (1 - discount / 100) * quantity).toLocaleString(
                                        'en-US',
                                    );
                                    return (
                                        <tr key={index}>
                                            <td datalabel="Sản phẩm">
                                                <Button className={cx('cart-item-img')}>
                                                    <img src={images} alt="" />
                                                </Button>
                                            </td>
                                            <td datalabel="Mô tả">
                                                <Button className={cx('product-name')}>
                                                    {subCatName} {name}
                                                </Button>
                                                <p className={cx('product-description')}>{color}</p>
                                                <span className={cx('delete-btn')} onClick={() => handleDeleteProductinCart(id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </span>
                                            </td>
                                            <td datalabel="Đơn giá" className={cx('product-price')}>
                                                {PriceInText}đ
                                            </td>
                                            <td datalabel="Số lượng">
                                                <div className={cx('quantity-wrapper', 'd-flex')}>
                                                    <button className={cx('btn')} onClick={() => cartQuantityMinus(id)}>
                                                        -
                                                    </button>
                                                    <span>{quantity}</span>
                                                    <button className={cx('btn')} onClick={() => cartQuantityAdd(id)}>
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td datalabel="Tổng giá" className={cx('total-price')}>
                                                {TotalPrice}đ
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <Row>
                            <Col className={cx('checkout-note')} xs={12} md={8} xl={8}>
                                <label htmlFor="checkout-note">Ghi chú cho cửa hàng</label>
                                <textarea name="" id="checkout-note" cols="60" rows="4"></textarea>
                            </Col>
                            <Col className={cx('checkout-controls')} md={4} xl={4} xs={12}>
                                <div>
                                    <span>Tổng tiền</span>
                                    <span className={cx('cart-total')}>{cartTotal}</span>
                                </div>
                                <Button primary to="/checkout">
                                    Thanh toán
                                </Button>
                            </Col>
                        </Row>
                    </div>
                )}
            </Container>
        </>
    );
};

export default Cart;
