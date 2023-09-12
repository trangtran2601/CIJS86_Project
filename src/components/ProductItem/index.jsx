
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { subCategories } from '../../utils/mockData';
import { useCart } from '../../contexts/CartContext'
import Button from '../Button';
import { Link } from 'react-router-dom';
import { getStorage, ref, getDownloadURL } from "firebase/storage"
const cx = classNames.bind(styles);
const ProductItem = ({ item }) => {
    const { cartList, setCartList } = useCart();
    const [hover, setHover] = useState(false)
    const storage = getStorage();
    const [mainImage, setMainImage] = useState('')
    const [otherImages, setOtherImages] = useState([])
    const { id, name, subCategoryId, description, originalPrice, discount, images, stock } = item;
    let subCatName = subCategories.find((subCat) => subCat.id === subCategoryId).name;
    
      useEffect(()=> {
        const getMainImage = async() => {
            const path = ref(storage, images.mainImage);
          const downloadedURL = await getDownloadURL(path)
          setMainImage(downloadedURL)
         }
         getMainImage()        
         },[])
         useEffect(()=> {
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
      
         },[])

    const handleAddProductToCart = (id, quantity) => {
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
                    ...item,
                    images: item.images.mainImage,
                    quantity: quantity,
                },
            ]);
        }
    };

    return (
        <div          
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)} 
        >
            <Link to={`/collections/${id}`} className={cx('img-container')}>
                <img 
                className={cx('img-before')} 
                src={mainImage}
               
                />
                <img className={cx('img-after', hover ? 'active' : '' )} src={otherImages[0]} alt="" />
                <span className={cx('discount', `${discount == 0 ? '' : 'active'}`)}>-{discount}%</span>
            </Link>
            <div className={cx('product')}>
                <div className={cx('info')}>
                    <Link to={`/collections/${id}`} className={cx('name')}>
                        {name}
                    </Link>
                    <p className={cx('sub-category')}>{subCatName}</p>
                    <div className={cx('price')}>
                        <span className={cx('old-price', `${discount == 0 ? '' : 'active'}`)}>
                            {originalPrice.toLocaleString('en-US')}₫
                        </span>
                        <span className={cx('current-price')}>
                            {(originalPrice * (1 - discount / 100)).toLocaleString('en-US')}₫
                        </span>
                    </div>
                </div>

                <Button className={cx('add-btn')} onClick={() => handleAddProductToCart(id, 1)} outline>
                    Thêm vào giỏ hàng
                </Button>
            </div>
        </div>
    );
};

export default ProductItem;
