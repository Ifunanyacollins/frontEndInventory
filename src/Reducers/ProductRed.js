
const Product = []

export default (state = Product,action) => {
    switch(action.type){
        case 'AddProduct':
        return [
            ...state,
            ...action.product
        ]
    case 'DeleteProduct':
        return state.filter((product)=> product._id !== action.id)
        
        default:
         return state
    }
}