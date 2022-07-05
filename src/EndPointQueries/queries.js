import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
query  {
  category {
    products {
      id, name, inStock, gallery,brand
      attributes { id }
      prices {
        amount,
        currency { label, symbol } 
      }
    }
  }
}
`
export const GET_PRODUCT_DETAIL = gql`
query ($product_id: String!){
	product(id: $product_id){
    id
    name
    gallery
    description
    brand
    prices { amount, currency{ label, symbol } }
    attributes {id, name, type, items{ displayValue, value, id}}
  }
}
`
export const GET_ALL_CURRENCY = gql`
query {
	currencies {
    label
    symbol
  }
}
`
