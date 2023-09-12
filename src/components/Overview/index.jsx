import React from 'react'
import classNames from 'classnames/bind';
import styles from './Overview.module.scss';
const cx = classNames.bind(styles);
const Overview = ({children}) => {
  return (
    <div className={cx('intro')}>
        <h4 className={cx('heading')}>Ghé qua cửa hàng để lựa chọn những sản phẩm mới nhất của chúng tôi</h4>
        <div className={cx('overview')}>
            {children}
        </div>
    </div>
  )
}

export default Overview