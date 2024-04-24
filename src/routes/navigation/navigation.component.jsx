import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrmLogo} from "../../assets/007 crown.svg";
import './navigation.styles.scss';
import CartIcon from "../../Component/cart-icon/cart-icon.component";
import CartDropdown from "../../Component/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utility/firebase/firebase.util";

const Navigation =()=>{
  const { currentUser} = useContext(UserContext);
  
  return(
    <Fragment>
      <div className="navigation">
          <Link className="logo-container" to="/">
            <CrmLogo className="logo"/>
          </Link>
          <div className="nav-links-container">
            <Link className="nav-link" to="/shop">
                SHOP
            </Link>
            {currentUser ?(
                <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>)
                :(
                  <Link className="nav-link" to="/auth">
                  SIGN IN
                  </Link>
                )
              }
              <CartIcon/>
            </div>
            <CartDropdown/>
      </div>
      <Outlet/>
    </Fragment>
  )

}  

export default Navigation;