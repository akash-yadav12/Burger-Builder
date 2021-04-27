import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders'
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'



class BurgerBuilder extends Component {


  state = {
    purchasing: false,
    loading: false
  }

  componentDidMount() {
    console.log(this.props)
    // axios.get('https://brave-aileron-310307-default-rtdb.firebaseio.com/ingredients.json')
    //   .then(res => {
    //     console.log(res)
    //     this.setState({ ingredients: res.data })
    //   })
    //   .catch(err => { console.log(err); this.setState({ error: true }) })
    // const updateIng = {
    //   salad: 0,
    //   bacon: 0,
    //   cheese: 0,
    //   meat: 0
    // }
    // this.setState({ ingredients: updateIng })
  }

  updatePurhcaseState(ingredients) {
    const sum = Object.keys(ingredients).map((igKey) => (ingredients[igKey])).reduce((acc, el) => { return acc + el }, 0)
    console.log(sum)
    return sum > 0
  }


  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }


  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    // alert('You Continue!')


    this.props.history.push('/checkout')

  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null

    let burger = this.state.error ? <p>Ingredients can't be found</p> : <Spinner />
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchaseable={this.updatePurhcaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      )

      orderSummary = (
        <OrderSummary ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      )
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}

      </Aux>
    )
  }

}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({
      type: actionTypes.ADD_INGREDIENTS,
      ingredientName: ingName
    }),
    onIngredientRemoved: (ingName) => dispatch({
      type: actionTypes.REMOVE_INGREDIENTS,
      ingredientName: ingName
    })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))