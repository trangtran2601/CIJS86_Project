import classNames from 'classnames/bind';
import styles from './HeaderSearch.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleXmark  } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../../components/Button';
const cx = classNames.bind(styles);

const HeaderSearch = () => {
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef();
   const navigate = useNavigate()
    
    const handleChangeInput = (e) => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(' ')) {
          setSearchValue(searchValue)
        }
      }
      const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
      };
      const handleSearch = () => {
        navigate(searchValue ? `/search/${searchValue}` : "/")
        setSearchValue('')
      }
    return (
        <div className={cx('wrapper', "d-flex")}>
            <div className={cx('search' )}>
            <input type="text" 
                className={cx('input')} 
                placeholder="Tìm kiếm sản phẩm..."      
                ref={inputRef}
                value={searchValue}
                spellCheck={false}
                onChange={handleChangeInput}/>
                {!!searchValue && (
              <button className={cx('clear')} onClick={handleClear}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            )}
            </div>
            <Button className={cx('d-flex', 'icon')} onClick={handleSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </Button>
        </div>
    );
};

export default HeaderSearch;
