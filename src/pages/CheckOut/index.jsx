import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind';
import styles from './CheckOut.module.scss';
import { getAuth } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { useFirebase } from '../../contexts/firebaseContext';
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from '../../components/Button';
import Input from '../../components/Input';
import Image from '../../components/Image';
import {paymentMethods, subCategories} from '../../utils/mockData'
import { useCart } from '../../contexts/CartContext';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import * as APIservices from "../../services/APIservices"
const cx = classNames.bind(styles);
const CheckOut = () => {
  const auth= getAuth(); 
  const user = auth.currentUser
  const [provinces, setProvinces] = useState(null)
  const [districts, setDistricts] = useState(null)
  const [wards, setWards] = useState(null)
  const [checkOutSuccess, setCheckOutSuccess] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(1)
  const {orderCollection} = useFirebase()
  const { cartList, setCartList , cartTotalPrice } = useCart();
  const cartTotal = cartTotalPrice(cartList);
  const navigate = useNavigate()
  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
  const validation = useFormik({
    initialValues: {
      name: "",
      email: user ? user.email : '',
      phoneNumber: '',
      houseNumber: '',
      province: 0,
      district: 0,
      ward: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string()
      .required("Required!"),
        email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
        phoneNumber: Yup.string()
        .required("Required!")
        .matches(phoneRegExp, "Invalid phone number"),
        houseNumber: Yup.string()
        .required("Required!"),
        province: Yup.number()
        .required("Required!"),
        district: Yup.number()
        .required("Required!"),
        ward: Yup.number()
        .required("Required!")
    }),
    onSubmit: (values) => {
      console.log(values)
        const sendOrder = async () => {
          const {name, email, phoneNumber , houseNumber, province, district , ward} = values
          const docRef = await addDoc(orderCollection, {
            userId: user ? user.uid : "",
            name,
            email,
            phoneNumber,
            address: {
              houseNumber,
              province,
              district,
              ward
            },
            submitDate: Date.now(),
            cart: [...cartList],
            total: cartTotal,
            paymentMethod,
            status: "Đã xác nhận"
          })
          setCartList([])
          setCheckOutSuccess(true)
        }
        sendOrder()
    }
})

useEffect(()=>{
 if (checkOutSuccess) {
  setTimeout(function(){
    setCheckOutSuccess(false)
    navigate('/')
}, 5000)

 }
},[checkOutSuccess])

useEffect(() => {

      const getProvince = async () => {
        const result = await APIservices.getAddress("",1)
        setProvinces(result)
      }
      getProvince()
},[])
const handleChangeProvince = (event) => {
  // validation.handleChange()
  const provId = event.target.value
  if (provId) {
    const getDistrict = async () => {
       const data = await APIservices.getAddress(`p/${provId}`,2)
       setDistricts(data.districts)
    }
    getDistrict()
  }
}

const handleChangeDistrict = (event) => {
  // validation.handleChange()
  const distId = event.target.value
  if (distId) {
    const getWard = async () => {
       const data = await APIservices.getAddress(`d/${distId}`,2)
       setWards(data.wards)
    }
    getWard()
  }
}

const handleSubmitOrder = (e) => {
  e.preventDefault()
  validation.handleSubmit() 
}


const handleChangePaymentMethod = (e) => {
  const value = e.target.value
  if (paymentMethod !== value) {
        setPaymentMethod(value)
  }
}

const handleCloseModal = () => {
  setCheckOutSuccess(false)
  navigate('/')
}
  return (
    <Container>
    <div className={cx("checkout-success-modal", checkOutSuccess ? "active" : "")} onClick={handleCloseModal}>
        <div className={cx("checkout-success-content")}>
          <p>Cảm ơn bạn đã đặt hàng tại BEYOURs</p>
          <p>Đơn hàng của bạn đã được ghi nhận. Nhân viên CSKH sẽ liên hệ bạn trong vòng 24h tới để xác nhận.</p>
        </div>
    </div>
    <div className={cx("header")}>
        <div className={cx("header-label")}>
            <Link to="/"  className={cx("header-label-heading")}>Nội Thất BEYOURs</Link>
            <div><Link to="/cart">Giỏ hàng</Link></div> 
        </div>      
    </div>            
    <Row className={cx("wrapper")}>           
        <Col xs={12} lg={6} className={cx("customer-info")}>
            <div>             
                <h4 className={cx("section-title")}>Thông tin thanh toán </h4>
                {user ? <div className={cx("d-flex", "user-info")}>
                <Image src={user.photoURL || "/"} className={cx("avatar")} fallback="https://cdn-icons-png.flaticon.com/512/149/149071.png"/>
                <span>{user.email}</span>
              </div> :  <div className={cx("content-text")}>Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></div>}
               
            </div>
            <div className={cx("customer-info-content")}>
                <form action="" method="POST" className="form" id="personal-info">
                        <Row>
                            <Col xs={12}>
                                 <Input 
                                 type="text" 
                                 placeholder="Họ và tên" 
                                 name="name" 
                                 className={cx('form-input')}
                                 value={validation.values.name}
                                 onChange={validation.handleChange}
                                 inValid={validation.errors.name}
                                 istouched = {validation.touched.name ? 1 : undefined}
                                 />
                            </Col> 
                            {user ? <></> :
                                <Col xs={12} md={8}>
                                    <Input 
                                    type="email" 
                                    placeholder="Email, vd: me@example.com" 
                                    name="email" 
                                    className={cx('form-input')}
                                    value={validation.values.email}
                                    onChange={validation.handleChange}
                                    inValid={validation.errors.email}
                                    istouched = {validation.touched.email ? 1 : undefined}
                                    />
                              </Col>          
                            }
                            
                            <Col xs={12} md={user ? 12 : 4}>
                                <Input 
                                type="tel" 
                                placeholder="Điện thoại" 
                                name="phoneNumber" 
                                className={cx('form-input')}
                                value={validation.values.phoneNumber}
                                onChange={validation.handleChange}
                                inValid={validation.errors.phoneNumber}
                                istouched = {validation.touched.phoneNumber ? 1 : undefined}
                                />
                            </Col>        
                            <Col xs={12}>
                                <Input 
                                type="text" 
                                placeholder="Số nhà, tên đường" 
                                name="houseNumber" 
                                className={cx('form-input')}
                                value={validation.values.houseNumber}
                                onChange={validation.handleChange}
                                inValid={validation.errors.houseNumber}
                                istouched = {validation.touched.houseNumber ? 1 : undefined}
                                />
                            </Col>
                        </Row>
                        <Row className="dropdown-container">   
                            <Col xs={12} md={4}>
                                <Input 
                                isSelect 
                                name="province" 
                                className={cx('form-input')}  
                                onChange={handleChangeProvince}
                                // value={validation.values.province}
                                // inValid={validation.errors.province}
                                // istouched = {validation.touched.province ? 1 : undefined}
                                >
                                    <option value="">Chọn Tỉnh thành</option>
                                    {provinces && provinces.map((province) => {
                                          return <option key={province.code} value={province.code}>{province.name}</option>
                                    })}   
                                </Input>
                            </Col> 
                            <Col xs={12} md={4}>
                                <Input 
                                isSelect 
                                name="district" 
                                className={cx('form-input')} 
                                onChange={handleChangeDistrict}
                                // value={validation.values.district}
                                // inValid={validation.errors.district}
                                // istouched = {validation.touched.district ? 1 : undefined}                             
                                >
                                    <option value={null}>Chọn Quận/Huyện</option>
                                    {districts && districts.map((district) => {
                                        return <option key={district.code} value={district.code}>{district.name}</option>
                                    })}
                                </Input>
                            </Col>
                            <Col xs={12} md={4}>
                                <Input 
                                isSelect 
                                name="ward" 
                                className={cx('form-input')} 
                                // value={validation.values.ward}
                                // inValid={validation.errors.ward}
                                // onChange={validation.handleChange}
                                // istouched = {validation.touched.ward ? 1 : undefined} 
                                >
                                    <option value={null}>Chọn Phường/Xã</option>
                                    {wards && wards.map((ward) => {
                                        return <option key={ward.code} value={ward.code}>{ward.name}</option>
                                    })}
                                </Input>
                            </Col>
                        </Row>
                        <div>
                            <h4 className={cx("section-title")}>Phương thức thanh toán</h4>
                            <ul className={cx("payment-method-list")}>
                                {paymentMethods.map((item) => {
                                  const {id, name, shortText, description, image} = item
                                        return (
                                                  <li key={id} className={cx("payment-method-item")}>
                                                        <div className={cx("payment-method-option","d-flex")}>
                                                          <input className={cx("form-check-input")} type="radio" name="paymentMethod" value={id}
                                                          onChange={handleChangePaymentMethod}
                                                          checked = {paymentMethod == id ? true : false}
                                                          
                                                          />
                                                              <Image 
                                                              className={cx("payment-method-img")} 
                                                              src={image}
                                                              />
                                                          <label>{shortText}</label>
                                                      </div>
                                                      <div className={cx("payment-method-detail", paymentMethod == id ? "active" : "")}>
                                                            {description.map((item, index) => {
                                                              return <p key={index}>{item}</p>
                                                            })}
                                                      </div>
                                                  </li>
                                   )
                                })}
                            </ul> 
                        </div>
                        <Button 
                        type="submit"
                        className={cx("order-btn")} 
                        large 
                        primary 
                        onClick={handleSubmitOrder}
                        >Đặt hàng</Button> 
                </form>       
           </div>            
        </Col>
        <Col xs={12} lg={6} className={cx("product-info")}>
            <div className={cx("checkout")}>
                <table className={cx("product-table")}>
                    <thead>
                        <tr>
                            <th scope="col">Hinh ảnh</th>
                            <th scope="col">Thông tin chi tiết sản phẩm</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Đơn giá</th>
                        </tr>
                    </thead>
                    <tbody className={cx("cart-checkout")}>
                                {cartList.map((cartItem) => {
                                      const {
                                        id,
                                        name,
                                        color,
                                        originalPrice,
                                        discount,
                                        images,
                                        quantity,
                                        subCategoryId,
                                    } = cartItem;
                                    let subCatName = subCategories.find((subCat) => subCat.id === subCategoryId).name;
                                    const TotalPrice = (originalPrice * (1 - discount / 100) * quantity).toLocaleString('en-US');
                                    console.log(images)
                                    return (                                                                     
                                            <tr key={id}>
                                            <th scope="row">
                                                  <div className={cx("checkout-image-wrapper")}>
                                                      <Image src={images} className={cx("image")}/>
                                                      <div className={cx("quantity")}>{quantity}</div>
                                                  </div>
                                            </th>
                                            <td>
                                                <div className={cx("checkout-product-info")}>
                                                    <div className={cx("checkout-name")}>{subCatName} {name}</div>
                                                    <div className={cx("checkout-info")}>{color}</div>
                                                </div>
                                            </td>
                                            <td>
                                                  <div className={cx("current-price")}>
                                                    {TotalPrice}₫
                                                  </div>
                                            </td>                                            
                                        </tr>
                                    )
                                })}
                    </tbody>
                </table>
                  <div className={cx("form-discount-wrapper","d-flex")}>
                      <input type="text" placeholder="Mã giảm giá"/>
                      <Button className={cx("btn")} outline>Sử dụng</Button>
                  </div>
                <div className={cx("fee-wrapper")}>
                      <span>Phí vận chuyển </span>
                      <span>Nhân viên sẽ liên hệ và báo phí vận chuyển</span>
                </div>
                <div className={cx("fee-wrapper")}>
                      <span>Tổng tiền</span>
                      <span className={cx("total-price")}>VNĐ {cartTotal}</span>
                </div>
            </div>
        </Col>
    </Row>
</Container>
  )
}

export default CheckOut