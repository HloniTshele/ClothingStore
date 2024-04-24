import './cart-icon.styles.scss';
import {ReactComponent as ShoppingIcon} from '../../assets/004 shopping-bag.svg';

// Creating an Icon component

const CartIcon =()=>{
    //our shopping cart must have the icon with an integer/number counting the number our items added
    return(
        <div className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>0</span>
        </div>
    )
}


export default CartIcon;