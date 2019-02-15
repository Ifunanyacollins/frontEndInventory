export default (products,{ text ,sortWord ,sortBy}) =>{
    
    return products.filter((product)=>{
      if(product){
        const textMatch = product.Status.toLowerCase().includes(text.toLowerCase()) || product.SKU.toLowerCase().includes(text.toLowerCase()) || String(product.SellingPrice).toLowerCase().includes(text.toLowerCase()) || product.Category.toLowerCase().includes(text.toLowerCase()) || product.Title.toLowerCase().includes(text.toLowerCase())
        return textMatch;
      }
        
    

    }).sort((a,b)=>{
        
        if(sortBy === 'up'){
          return   a[sortWord] < b[sortWord] ? -1 : 1
        }else if(sortBy === 'down'){

            return     b[sortWord] < a[sortWord] ? -1 : 1
        }

        
    })

    
 }