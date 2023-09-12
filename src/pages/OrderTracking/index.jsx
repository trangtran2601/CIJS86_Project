import React, { useEffect, useState } from 'react'
import Overview from '../../components/Overview'
import classNames from 'classnames/bind';
import styles from './OrderTracking.module.scss';
import { useParams } from 'react-router-dom';
import {doc, getDocs, getDoc } from 'firebase/firestore';
import { useFirebase } from '../../contexts/firebaseContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '../../components/Button';
import Image from '../../components/Image';
import { subCategories } from '../../utils/mockData';
import { db } from '../../services/firebase';
const cx = classNames.bind(styles);
const OrderTracking = () => {
    const {userId} = useParams()
    const [currentUser, setCurrentUser] = useState()
    const {orderCollection} = useFirebase()
    const [orders, setOrders] = useState([])
    useEffect(()=> {
    const getUser = async () => {
        const docRef = doc(db, "users", userId)
        const docSnap  = await getDoc(docRef)
        const user  = {
        id: userId,
        ...docSnap.data()   
      }
      setCurrentUser(user)
    }      
    const getOrders = async () => {
     //tải đơn hàng
      const docs = await getDocs(orderCollection)
      const orderList = []
      docs.forEach(doc => {
        orderList.push(doc.data())
      }) 
      const renderedOrder = orderList.filter((item) => item.userId == userId)
      setOrders(renderedOrder)
    }
    getUser()
    getOrders()
    },[])
console.log(orders)
  return (
    <div>
        <Overview>
            <FontAwesomeIcon icon={faHouse} />
            <span> Kiểm Tra Trạng Thái Đơn Hàng</span>
        </Overview>
        <Container>
            <Row className={cx("wrapper")}>
                {currentUser ? <Col md={3}>
                    <div className={cx("user-info")} >
                        <Image className={cx("avatar")}  src={currentUser.photoURL} fallback="https://cdn-icons-png.flaticon.com/512/149/149071.png"/>
                        <span className={cx("user-name")}>{currentUser.displayName}</span>
                    </div>
                    <ul className={cx("navigation")}>
                        <li>
                            <FontAwesomeIcon icon={faUser}/>
                            <span>Tài khoản của tôi</span>
                        </li>
                        <li className={cx("active")}>
                            <FontAwesomeIcon icon={faFileInvoiceDollar}/>
                            <span>Đơn mua</span>
                        </li>
                    </ul>
                </Col> : <></>}
                
                <Col md={9}>
                    {orders.length > 0 ? 
                    orders.map((order, index) => {
                        const {submitDate, cart, status, total} = order
                        return (
                            <div key={index} className={cx("order-wrapper")}>
                                <div className={cx("d-flex", "order-info")}>
                                    <div>
                                        <span >Mã đơn hàng</span>
                                        <span className={cx("order-id")}>{submitDate}</span>
                                    </div>
                                    <span className={cx("status")}>{status}</span>
                                </div>
                                <div  className={cx("cart-table")}> 
                                    <table>
                                        <thead>
                                            <tr>
                                                <th >SẢN PHẨM</th>
                                                <th colSpan="4">MÔ TẢ</th>
                                                <th >TỔNG GIÁ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {cart.map((item, index) => {
                                            const {
                                                
                                                name,
                                                color,
                                                size,
                                                originalPrice,
                                                discount,
                                                images,
                                                quantity,
                                                subCategoryId,
                                            } = item;
                                            let subCatName = subCategories.find((subCat) => subCat.id === subCategoryId).name;
                                            const TotalPrice = (originalPrice * (1 - discount / 100) * quantity).toLocaleString(
                                                'en-US',
                                            );
                                            return (
                                                <tr key={index} >
                                                    <td datalabel="Sản phẩm">
                                                        <Button className={cx('product-img')}>
                                                            <Image src={images} alt="" />
                                                        </Button>
                                                    </td>
                                                    <td datalabel="Mô tả" className={cx('product-info')} >
                                                        <p className={cx('product-name')}>
                                                            {subCatName} {name}
                                                        </p>
                                                        <p className={cx('product-description')}>
                                                            <span>{color}</span>
                                                            <span>{size}</span>
                                                        </p>
                                                        <p className={cx('product-quantity')}>x{quantity}</p>
                                                    </td>
                                                    <td datalabel="Tổng giá" className={cx('total-price','text-right')}>
                                                        {TotalPrice}đ
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        }
                                        </tbody>
                                 
                                    </table>                                  
                                </div>
                                <div className={cx('order-total')}>
                                        <span>Thành tiền</span>
                                        <span >VNĐ {total}</span>
                                </div>
                            </div>
                        )
                    }) : 
                    <div className={cx("order-empty")}>
                        <p>Bạn chưa có đơn hàng nào.</p>
                        <p>
                            Tiếp tục mua hàng
                            <Button to="/" className={cx("btn")}>tại đây</Button>
                        </p>
                    </div>}
                </Col>
            </Row> 
        </Container>
    </div>
  )
}

export default OrderTracking