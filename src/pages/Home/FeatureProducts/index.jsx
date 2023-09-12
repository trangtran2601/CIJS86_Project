import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind';
import styles from './FeatureProducts.module.scss';
import { Row } from 'react-bootstrap';
import ProductItem from '../../../components/ProductItem';
import { useFirebase } from '../../../contexts/FirebaseContext';
import { getDocs} from 'firebase/firestore';
const cx = classNames.bind(styles)
const FeatureProducts = () => {
  const [renderedProductList, setRenderProductList] = useState(null)
  const {productCollection} = useFirebase()

  useEffect(() => {
      const getProduct = async () => {
        const productArr = []
        const docs = await getDocs(productCollection)
        docs.forEach(doc => {
         return productArr.push({
          id: doc.id,
          ...doc.data()
         })
        })
        setRenderProductList(productArr)
      }
      getProduct()
     
  },[])
  return (
    <>
      <div className={cx('title-bar')}>
          <div className={cx('title')}>SẢN PHẨM TIÊU BIỂU</div>
      </div>
      <Row className={cx('inner')} sm={2} md={3} lg={4} xl={5}>
          {renderedProductList && renderedProductList.map((product, index) => {
            return <ProductItem key={index} item={product}/>
          })}
      </Row>
   
    </>
  )
}

export default FeatureProducts