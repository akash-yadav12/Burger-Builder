
import logo from '../../assets/images/logo.png'
import classes from './Logo.module.css'

const Logo = (props) => (
  <div className={classes.Logo}>
    <img src={logo} alt="MyBurgerLogo" />
  </div>
)

export default Logo