import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import Popper from '../../../../../components/Popper';
import Tippy from '@tippyjs/react/headless';
import CartItem from './CartItem';
import Button from '../../../../../components/Button';
import { useCart } from '../../../../../contexts/CartContext';
const cx = classNames.bind(styles);

const Cart = () => {
    const {cartList, cartTotalQuantity, cartTotalPrice } = useCart()
    return (
        <Tippy
          offset={[30, 10]}
            interactive
            render={(attrs) => (
                <div className={cx('cart-list')} tabIndex="-1" {...attrs}>
                    <Popper>
                        <h4 className={cx('cart-heading')}>GIỎ HÀNG</h4>
                        <p className={cx('quantity-text')}>{cartTotalQuantity(cartList)} Sản phẩm trong giỏ</p>
                        <ul className={cx('product-list')}>
                            {cartList.map((cartItem, index) => {
                                return <CartItem key={index} item={cartItem} />;
                            })}
                        </ul>
                        <div className={cx('total-wrapper', 'd-flex')}>
                            <span>TẠM TÍNH</span>
                            <span>{cartTotalPrice(cartList)}</span>
                        </div>
                        <Button to="/cart" className={cx('checkout-btn')} primary>
                            Xem Giỏ Hàng Và Thanh Toán
                        </Button>
                    </Popper>
                </div>
            )}
        >
            <div className={cx('cart-wrap')}>
                <i className="cart-icon fa-solid fa-cart-shopping"></i>
                <span className={cx('cart-notice')}>{cartTotalQuantity(cartList)}</span>
            </div>
        </Tippy>
    );
};

export default Cart;
