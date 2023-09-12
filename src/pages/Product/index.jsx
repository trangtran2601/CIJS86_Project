import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Row, Col, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faChevronLeft, faHouse, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { doc, getDoc} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { useCart } from '../../contexts/CartContext';
import { categories, subCategories } from '../../utils/mockData';
import Overview from '../../components/Overview';
import Image from "../../components/Image";
import Button from '../../components/Button';
import { db } from '../../services/firebase';
const cx = classNames.bind(styles);

const Product = () => {
  const {productId} = useParams()
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(0)
  const { cartList, setCartList } = useCart();
  const storage = getStorage();
  const [otherImages, setOtherImages] = useState([])

  //Slider

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });


  const Slidersettings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    // lazyLoad: true,
    asNavFor: ".slider-nav",
    focusOnSelect: true,
    nextArrow: (
      <div>
        <div className="next-slick-arrow slider-btn"><FontAwesomeIcon icon={faChevronRight}/></div>
      </div>
    ),
    prevArrow: (
      <div>
        <div className="next-slick-arrow slider-btn"><FontAwesomeIcon icon={faChevronLeft}/></div>
      </div>
    ),
  };
  const thumbnailSettings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    swipeToSlide: true,
    focusOnSelect: true,
  };


  let {id, name, subCategoryId, description, originalPrice, discount, images, color, size ,stock } = product
  let subcatObj, subCatName, catId, catName

  useEffect(() => {
  
    const getProduct = async () => {
     //tải sản phẩm
      const docRef = doc(db, "products", productId)
      const docSnap  = await getDoc(docRef)
      const renderedProduct = {
        id: productId,
        ...docSnap.data()
      }
      setProduct(renderedProduct)
      // Tải hình ảnh phụ
      const images = renderedProduct.images
      const otherImageList = []
      images.otherImages.forEach((image) => {            
         const getOtherImage = async() => {
             const path = ref(storage, image);
             const downloadedURL = await getDownloadURL(path)
             otherImageList.push(downloadedURL)
             setOtherImages([...otherImageList])
         }
         getOtherImage()
      })
    }
    getProduct()
   
},[])

if (product.id) {
  subcatObj = subCategories.find((subCat) => subCat.id === subCategoryId)
  subCatName = subcatObj.name
  catId = subcatObj.catId
  catName = categories.find((cat) => cat.id === catId).name

}

const quantityMinus = () => {
    if (quantity > 0) {
      setQuantity(prev => prev -1 )
    }
}

const quantityAdd = () => {
  if (quantity < stock) {
    setQuantity(prev => prev + 1)
  }
}

const handleAddProducttoCart = (id, quantity) => {
  if (cartList.find((cartItem) => cartItem.id == id)) {
    setCartList(
        cartList.map((cartItem) => {
            if (cartItem.id === id) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity + quantity,
                };
            } else {
                return {
                    ...cartItem,
                };
            }
        }),
    );
} else {
    setCartList([
        ...cartList,
        {
          ...product,
            quantity: quantity,
        },
    ]);
}
}

  return (
  <div>
    {product.id && 
    <>
     <Overview>
        <FontAwesomeIcon icon={faHouse} />
        <span>
            {catName} - {subCatName} - {name}
        </span>                     
      </Overview>
      <Container className={cx('wrapper')}>
        <Row>
            <Col xl={6} md={6} className={cx('image-container')}>
              <div className={cx('image-wrapper')}>
                <Slider
                {...Slidersettings}
                asNavFor={nav2}
                ref={(slider) => setSlider1(slider)}
                >
                  {otherImages.map((image, index) => {
                    return (
                      <Image key={index} src={image} className={cx('main-img')}/>
                    )
                  })}
                </Slider>
              </div>
              <div className="thumbnail-wrapper">
                  <Slider
                    {...thumbnailSettings}
                    asNavFor={nav1}
                    ref={(slider) => setSlider2(slider)}
                  >
                    {otherImages.map((image, index) => (
                        <Image key={index} src={image} className={cx('thumbnail-img')} />
                    ))}
                  </Slider>
              </div>
            </Col>
            <Col xl={6} md={6} className={cx('product-info')}>
               <div className={cx('info-wrapper')}>
               <h2 className={cx('name')}>{name}</h2>
                <h4 className={cx('sub-name')}>{subCatName}</h4>
                <div className={cx('price-wrapper')}>
                    <span className={cx('old-price', `${discount == 0 ? '' : 'active'}`)}>
                              {originalPrice.toLocaleString('en-US')}₫
                    </span>
                    <span className={cx('new-price')}> {(originalPrice * (1 - discount / 100)).toLocaleString('en-US')}₫</span>
                    <span className={cx('discount')}>{discount}% giảm</span>
                </div>
                <div className={cx('detail-wrapper')}>
                  <span className={cx('text')}>Kích thước:</span>
                  <span className={cx('detail')}>{size} (Dài x Rộng x Cao)</span>
                </div>
                <div className={cx('detail-wrapper')}>
                  <span className={cx('text')}>Màu sắc:</span>
                  <span className={cx('detail')}>{color}</span>
                </div>
                <div className={cx('detail-wrapper')}>
                  <span className={cx('text')}>Chất liệu:</span>
                  <span className={cx('detail')}>{color}</span>
                </div>
                <div className={cx('d-flex', 'detail-wrapper')}>
                      <span className={cx('text')}>Số lượng:</span>
                      <div className={cx('d-flex', 'quantity-wrapper')}>
                          <button className={cx('btn')} onClick={quantityMinus}>
                            -
                          </button>
                          <span className={cx('quantity')}>{quantity}</span>
                          <button className={cx('btn')} onClick={quantityAdd}>
                              +
                          </button>
                      </div>
                      <span>{stock} sản phẩm có sẵn</span>
                </div>
                <div className={cx('controls')}>
                    <Button outline onClick={()=> handleAddProducttoCart(id, quantity)}>
                          <FontAwesomeIcon icon={faCartPlus} />
                          Thêm vào giỏ hàng
                    </Button >
                    <Button primary  className={cx('buy-btn')}>
                          Mua ngay
                    </Button>
                </div>
               </div>
                <Row>
                    <Col xs={4} className={cx('policy-wrapper')}>
                        <Image src="https://theme.hstatic.net/200000044142/1000773248/14/chinh_sach_3.png?v=12163" className={cx('policy-img')}/>
                        <p>Miễn phí vận chuyển</p>
                    </Col>
                    <Col xs={4} className={cx('policy-wrapper')}>
                        <Image src="https://theme.hstatic.net/200000044142/1000773248/14/chinh_sach_1.png?v=12163" className={cx('policy-img')}/>
                        <p>Bảo hành 1 đổi 1 trong vòng 7 ngày</p>
                    </Col>
                    <Col xs={4} className={cx('policy-wrapper')}>
                        <Image src="https://theme.hstatic.net/200000044142/1000773248/14/chinh_sach_2.png?v=12163" className={cx('policy-img')}/>
                        <p>Đổi trả miễn phí trong vòng 7 ngày</p>
                    </Col>
                  
                </Row>

            </Col>
        </Row>
      </Container>
     </>
    }
  </div>
  )
}

export default Product