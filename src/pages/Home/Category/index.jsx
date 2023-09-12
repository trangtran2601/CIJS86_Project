import React from 'react'
import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import { Row , Col } from 'react-bootstrap';
import { categories } from '../../../utils/mockData';
const cx = classNames.bind(styles)

const CategoryItem = ( {item}) => {
  const {id, name, image} = item
return (
    <Col sm={6} sx={6} md={4} xl={2} className={cx('item')}> 
      <a className={cx('item-img')}>
        <img src={image}/>
      </a>
      <p className={cx('item-name')} >{name}</p>
    </Col>
)
}

const Category = () => {
  return (
    <Row className='container-section'>
      {categories.map((category) => {
        return <CategoryItem key={category.id} item={category} />
      })}
    </Row>
  )
}

export default Category