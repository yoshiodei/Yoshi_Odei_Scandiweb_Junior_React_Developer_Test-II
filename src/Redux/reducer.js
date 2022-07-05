import { UPDATE_CART_LIST ,CHANGE_CURRENCY, ADD_TO_CART } from './action.type';

const initialState = {
    cartItems: [],
    currency: {label: 'USD', symbol: '$', index: 0}
}

const reducer = (state = initialState , action) => {
    switch(action.type){
        case ADD_TO_CART:   let itemArray = [...state.cartItems, action.payload];
                            window.sessionStorage.setItem('cartItem', JSON.stringify(itemArray));
                            return {...state, cartItems: itemArray};

        case CHANGE_CURRENCY:   let currency = action.payload;
                                window.sessionStorage.setItem('currency', JSON.stringify(currency));
                                return {...state, currency};

        case UPDATE_CART_LIST:  let updatedItemArray = action.payload;
                                window.sessionStorage.setItem('cartItem', JSON.stringify(updatedItemArray));
                                return {...state, cartItems: action.payload};

        default: return state; 
    }
}

export default reducer;