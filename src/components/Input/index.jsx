import React, { forwardRef, useEffect, useState } from 'react'
import classNames from 'classnames/bind';
import styles from './Input.module.scss';
const cx = classNames.bind(styles);
const Input = forwardRef(({
  name, 
  type, 
  placeholder, 
  className, 
  value,
  isSelect = false,
  disabled = false,
  onChange,
  inValid,
  istouched,
  children,
  props}, ref) => {
// const [isValid, setIsValid] = useState(true)
let Comp = 'input'
const [message, setMessage] = useState(null)
const classes = cx('form-control', {
  [className]: className,
  disabled
});


useEffect(() => {
  if (istouched && inValid) {
    setMessage(inValid)
  }
},[istouched,inValid])


if (isSelect) {
  Comp = 'select'
}
// const validate = (value) => {
//   if (isRequired) {      
//     if (!value) {
//       setMessage("Vui lòng nhập trường này")  
//       return
//     }
//   }
//   if (len) {
//     if (value.length < len) {
//       setMessage(`Vui lòng nhập tối thiểu ${len} ký tự`)  
//       return
//     }
//   }
//   switch (type) {
//     case "email":
//       let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//       if (!regex.test(value)) {
//         setMessage("Vui lòng nhập đúng định dạng email")  
//         return 
//       }
//     break
//     case "tel":
//       let phoneregex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
//       if (!phoneregex.test(value)) {
//         setMessage("Vui lòng nhập đúng số điện thoại")  
//       }
//     break
//   }
// }

const handleOnBlur = (event) => {
  event.preventDefault()
  if (inValid){
    setMessage(inValid)
  }
  
}

const handleInput = () => {
  setMessage(null)   
}

return (
  <div className={cx('form-group', message ? "invalid" : "")}>
      <Comp 
      focus={name} 
      type={type} 
      placeholder={placeholder}
      className={classes}
      name={name} 
      value={value}
      onChange={onChange}
      onBlur={handleOnBlur}
      ref={ref}
      istouched={istouched}
      onInput={handleInput}
      {...props}>{children}</Comp>
      <span className={cx('form-message')}>{message}</span>
  </div> 
)
}
)
export default Input