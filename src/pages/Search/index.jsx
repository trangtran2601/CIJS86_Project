import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { getDocs} from 'firebase/firestore';
import { useFirebase } from '../../contexts/FirebaseContext';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import Overview from '../../components/Overview'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { subCategories } from '../../utils/mockData';
import { Container, Row, Col } from 'react-bootstrap';
import ProductItem from '../../components/ProductItem';
const cx = classNames.bind(styles);
const Search = () => {
    const {query} = useParams()
    const {productCollection} = useFirebase()
    const [renderedProducts, setRenderedProducts] = useState([])
    useEffect(() => {
  
        const getProduct = async () => {
         //tải sản phẩm
          const docs = await getDocs(productCollection)
          const productData = []
          docs.forEach(doc => {
            const value = query.toLowerCase()
            const name = doc.data().name.toLowerCase()
            const subCategoryId = doc.data().subCategoryId
            const subcatObj = subCategories.find((subCat) => subCat.id === subCategoryId)
            const subCatName = subcatObj.name.toLowerCase()
            if (subCatName.includes(value) || name.includes(value)) {
                productData.push({
                    id: doc.id,
                    ...doc.data()
                })
            } 
          })
          setRenderedProducts(productData)
        }
        getProduct()
    },[query])
  return (
    <div>
        <Overview >
            <FontAwesomeIcon icon={faHouse}/>
            <span> Kết quả tìm kiếm cho "{query}"</span>
        </Overview>
        <Container>            
            {renderedProducts.length > 0 ? 
            <Row className={cx('inner')} sm={2} md={3} lg={4} xl={5}>
                {renderedProducts.map((product, index) => {
                return <ProductItem key={index} item={product}/>})}
            </Row>
            : 
            <div className={cx('inner')}>
                <span className={cx('')}>Không tìm thấy sản phẩm, vui lòng tìm kiếm bằng 1 từ khóa khác.</span>
            </div>
            }
            
        </Container>
    </div>
  )
}

export default Search