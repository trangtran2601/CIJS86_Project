import classNames from 'classnames/bind';
import {Container} from 'react-bootstrap'
import styles from './Home.module.scss';
import Slider from './Slider';
import Category from './Category';
import FeatureProducts from './FeatureProducts';
import News from './News';
const cx = classNames.bind(styles);
const Home = () => {
    return (
        <div>
            <Slider />            
            <Container>
                <Category />
                <FeatureProducts />
                <News />
            </Container>
        </div>
    );
};


export default Home;
