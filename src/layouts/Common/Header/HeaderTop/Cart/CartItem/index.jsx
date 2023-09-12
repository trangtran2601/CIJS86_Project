import React from 'react';
import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import { useCart } from '../../../../../../contexts/CartContext';
import { subCategories } from '../../../../../../utils/mockData';
const cx = classNames.bind(styles);
const CartItem = ({ item }) => {
    let { id, name, color, originalPrice, discount, images, quantity, subCategoryId } = item;
    let subCatName = subCategories.find((subCat) => subCat.id === subCategoryId).name;
    const { cartQuantityAdd, cartQuantityMinus, handleDeleteProductinCart } = useCart()
    return (
        <li className={cx('wrapper')}>
            <div className={cx('ỉmg-wrapper')}>
                <img src={images} alt="" className={cx('img')} />
            </div>
            <div className={cx('product-detail')}>
                <a className={cx('product-name')} href="">
                    {subCatName} {name}
                </a>
                <p className={cx('product-description')}>{color}</p>
                <div className={cx('product-price')}>
                    Đơn giá: <span>{(originalPrice * (1 - discount / 100)).toLocaleString('en-US')}</span>
                </div>
                <div className={cx('product-count', 'd-flex')}>
                    <span className={cx('product-count-label')}>Số lượng</span>
                    <div className={cx('product-count-inner', 'd-flex')}>
                        <button className={cx('btn')} onClick={() => cartQuantityMinus(id)}>
                            -
                        </button>
                        <span>{quantity}</span>
                        <button className={cx('btn')} onClick={() => cartQuantityAdd(id)}>
                            +
                        </button>
                    </div>
                    <span className={cx('delete')} onClick={() => handleDeleteProductinCart(id)}>
                        Xóa
                    </span>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
