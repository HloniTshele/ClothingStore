import { useContext } from 'react';
import {ReactComponent as ShoppingIcon} from '../../assets/004 shopping-bag.svg';
import { CartContext } from '../../context/cart-context';

import './cart-icon.styles.scss';
// Creating an Icon component

const CartIcon =()=>{
    const {isCartOpen, setIsCartOpen} = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    //our shopping cart must have the icon with an integer/number counting the number our items added
    return(
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>0</span>
        </div>
    )
}


export default CartIcon;