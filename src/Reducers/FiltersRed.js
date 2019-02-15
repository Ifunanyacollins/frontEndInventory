const filter = {
    text:'',
    sortBy:'up',
    sortWord:'SKU'
}


export default (state = filter,action) => {

        switch(action.type){

            case 'up':
              return {
                  ...state,
                  sortBy:'up',
                  sortWord:action.sortWord
              }

            case 'down':
              return {
                  ...state,
                  sortBy:'down',
                  sortWord:action.sortWord
              }

            case 'text':
             return {
                 ...state,
                 text:action.text
             }

            default:
              return state
        }
} 


