import classNames from 'classnames/bind';
import styles from './Slider.module.scss';

const cx = classNames.bind(styles)

const Slider = () => {
    return (
        <a href="">
        <picture>
            <source media="(max-width: 768px)" srcSet="//theme.hstatic.net/200000044142/1000773248/14/mob_big_banner_index.png?v=12034"/>
            <source media="(min-width: 769px)" srcSet="//theme.hstatic.net/200000044142/1000773248/14/big_banner_index.png?v=12034"/>
            <img className={cx('img')} data-src="//theme.hstatic.net/200000044142/1000773248/14/big_banner_index.png?v=12034" alt="Umind"/>
        </picture>
    </a>
    )
}

export default Slider