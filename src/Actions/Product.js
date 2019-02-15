import axios from 'axios'




export const  AddProduct = (product = []) => (

    {
        type:'AddProduct',
        product
    }
)


export const  DeleteProduct = (id) => (

    {
        type:'DeleteProduct',
        id
    }
)


export  const SetProduct = () => {
    return (dispatch) => {
        return axios.get('https://mighty-hamlet-83421.herokuapp.com/api/getallproduct')
                                                                 .then((response)=>
                                                                 {
                                                                     
                                                                        dispatch(AddProduct(response.data)) 
                                                                                                                                                                                                                                  
                                                                    
                                                                     
                                                                   
                                                                }
                                                                    )
                                                                 .catch((error)=>console.log('error'))
    }
}


export  const SetDeleteProduct = (id) => {
    return (dispatch) => {
        return axios.post(`https://mighty-hamlet-83421.herokuapp.com/api/delete?id=${id}`)
                                                                 .then(({data})=>
                                                                 {
                                                                     
                                                                   if(data.message === 'deleted'){
                                                                    dispatch(DeleteProduct(id))  
                                                                   }   
                                                                                                                                                                                                                                  
                                                                         
                                                                     
                                                                   
                                                                }
                                                                    )
                                                                 .catch((error)=>console.log('error'))
    }
}



export const setSaveProduct = (data) => {
    return () =>{
       return axios.post('https://mighty-hamlet-83421.herokuapp.com/api/addProduct',data).then((response)=>response)
          .catch((error) => 'error' )
    }
}


export const  SetSavePrice = (data,id) => {
    return  () => {
       return axios.post(`https://mighty-hamlet-83421.herokuapp.com/api/update?id=${id}`,data)
       .then((response)=>response).catch((error)=>'error')
    }
}

export const setSaveVisual = (data,id) => {
    return () => {
        return axios.post(`https://mighty-hamlet-83421.herokuapp.com/api/update?id=${id}`,data)
        .then((response)=>response).catch((error)=>'error')
    }
}


export const setVerifyUser = (id) => {
    return () => {
        return         axios.get('https://mighty-hamlet-83421.herokuapp.com/api/getUser',{
            params:{
                id
            }
    })

}

}