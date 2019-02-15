import React , {Fragment,Component} from 'react';
import axios from 'axios'
import queryString  from 'querystring'
import {connect} from 'react-redux'
import ImageUpload from './ImageUpload'
import {Form,Input,Textarea,SubmitButton,Completed} from './Forms'
import {setSaveProduct,SetSavePrice,setSaveVisual,setVerifyUser} from '../Actions/Product'
import Header from './Header'


class WizardForm extends Component{
    constructor(props){
        super(props)
        this.state = {
          currentTab: 0,
          status:props.products ? props.products.Status.toLowerCase() : undefined  ,
          userverifyMessage:undefined,
          SKU:0,
          currentProductID:props.products ? props.products._id : ''  ,
          bioErrror:'',
          imageUrl:[],
        }
       
        this.subButton = React.createRef();
        this.subButton1 = React.createRef();
        this.subButton2 = React.createRef();
        this.tab1 = React.createRef();
        this.tab2 = React.createRef();
        this.tab3 = React.createRef();
        this.Tabs = [this.tab1,this.tab2,this.tab3]
    }
 componentDidMount(){
    this.handleHideTab(this.state.currentTab)
 }

   handleHideTab = (num) => {
       this.Tabs[num].current.style.display = "block"
       
   }

handleNext = () => {
      
   if(this.Tabs.length-1 <= this.state.currentTab){
        return false
   }
 
   this.Tabs[this.state.currentTab].current.style.display = "none"
   this.setState((prevState)=>({
       currentTab:prevState.currentTab + 1
   }),function(){
    this.handleHideTab(this.state.currentTab)
 })
    
   }


validation  = () => {
  
  const tabs = this.Tabs[this.state.currentTab].current.children[0].childNodes[0]
  for(var i = 0; i < tabs.length;i++){
    if(tabs[i].type === 'text' && tabs[i].value === "" ){
      tabs[i].focus()
      return false
    }else if(tabs[i].type === 'number' && tabs[i].value === ""){
      tabs[i].focus()
      return false
    }else if(tabs[i].type === 'textarea' && tabs[i].value === ""){
      tabs[i].focus()
      return false
    }
  }

  this.handleNext()

}

handlePrev = () => {
  
this.Tabs[this.state.currentTab].current.style.display = "none"
this.setState((prevState)=>({
    currentTab:prevState.currentTab - 1
}),function(){
 this.handleHideTab(this.state.currentTab)
})
 
}



 handleVerifyUser = (e) => {
     if(e.target.value){
       this.props.dispatch(setVerifyUser(e.target.value))
      .then(({data})=>this.setState({userverifyMessage:data.status}))
          .catch((error)=>this.setState({userverifyMessage:'error'}))
     }

 }





 handleSubmitProductBio = (e) => {
    e.preventDefault()
    this.subButton.current.textContent = 'saving....'
     const data = {
      Title:e.target.Title.value,
      Brand:e.target.Brand.value,
      ModelNumber:e.target.ModelNumber.value,
      Dimensions:e.target.Dimensions.value,
      Weight:e.target.Weight.value,
      Quantity:e.target.Quantity.value,
      Category:e.target.Category.value,
      Condition:e.target.Condition.value,
      Status:"Pending"
  }

this.props.dispatch(setSaveProduct(data)).then((response)=>{
  if(response.data.Status){
    this.subButton.current.textContent = 'saved'
    this.setState({SKU:response.data.SKU})
    this.setState({currentProductID:response.data._id})
    this.setState({status:response.data.Status})
  }else{
    this.subButton.current.textContent = 'save again'
  }

  })

  }

  handleSubmitPrice = (e) => {
    
     e.preventDefault()
     this.subButton2.current.textContent = 'saving...'
     const data = {
      ListedPrice:e.target.ListedPrice.value,
      SellingPrice:e.target.SellingPrice.value,
      Reserve:e.target.Reserve.value,
      Status:'Item Available'
   }
this.props.dispatch(SetSavePrice(data,this.state.currentProductID))
     .then(({data})=>{
       if(data.Status){
        this.subButton2.current.textContent = 'saved'
        this.setState({saveState:'Saved'})
        this.setState({status:data.Status})
        window.location ='/'
       }else{
        this.subButton2.current.textContent = 'save again'
       }

     })

  }

  handleUpload = (downloadURL) => {
  
    this.setState((prevState)=>(
      {imageUrl:[
          ...prevState.imageUrl,
          downloadURL
      ]
     
     }))
  }

 


  handleSubmitVisual = (e) => {
    e.preventDefault()
    this.subButton1.current.textContent = 'saving...'
    const data = {
      Images:this.state.imageUrl,
      Description:e.target.Description.value,
      Location:e.target.Location.value,
      Status:'Processing' 
   }
    this.props.dispatch(setSaveVisual(data,this.state.currentProductID)).then(({data})=>{
      if(data.Status){
        this.subButton1.current.textContent = 'saved'
        this.setState({status:data.Status})
      }else{
        this.subButton1.current.textContent = 'save again' 
      }

    })


  }




    render(){
        return(
            <Fragment>
            <Header />
            <section className="uk-container d-flex justify-content-center flex-column">
             
            <div className="mt-5">
            <h1 className="uk-text-lead">ADD PRODUCT</h1>
            </div>

          <Fragment>

           <div className="tab mt-5 mb-5 uk-background-secondary p-3" style={{display:"none"}} ref={this.tab1}>
           <div className="uk-container">
            { 
            
            this.state.status === 'pending' || this.state.status === 'processing' ? <Completed/> : <Form handleSubmit={this.handleSubmitProductBio} >

              <div className="uk-grid-match uk-child-width-expand@m " uk-grid="true">

              <div>
                <div className="uk-card uk-card-default uk-card-body">
                  <input type="text" onBlurCapture={this.handleVerifyUser}  className="form-control" placeholder="Client Code" name="ClientCode" required={true}/>
                 <span>{this.state.userverifyMessage === "ok" && this.state.userverifyMessage !== undefined ? <span className="text-success ">User found <i className="fas fa-check-circle pl-1"></i></span>:''}</span>
                 <span>{this.state.userverifyMessage !== "ok" && this.state.userverifyMessage !== undefined ? <span className="text-danger">User not found <i className="fas fa-times-circle pl-1"></i></span>:''}</span>
                </div>
            </div>
              </div>

                <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
                   
                <div>
                    <div className="uk-card uk-card-default uk-card-body">
                        <p>Product Title</p>
                        <Input placeholder="Title"  name="Title" type="text"  />
                    </div>
                </div>

                <div>
                    <div className="uk-card uk-card-default uk-card-body">
                    <p>Product Brand</p>
                     <Input placeholder="Brand" name="Brand" type="text"  />
                    </div>
                </div>


               </div>


               <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
                   
                <div>
                    <div className="uk-card uk-card-default uk-card-body">
                        <p>Product Model Number</p>
                        <Input placeholder="Model Number" name="ModelNumber" type="text"  />
                    </div>
                </div>

                <div>
                    <div class="uk-card uk-card-default uk-card-body">
                    <p>Product Dimensions</p>
                     <Input placeholder="Dimensions" name="Dimensions" type="text"  />
                    </div>
                </div>


               </div>

               <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
                   
                <div>
                    <div className="uk-card uk-card-default uk-card-body">
                        <p>Product Weight</p>
                        <Input placeholder="Weight" name="Weight" type="text"  />
                    </div>
                </div>

                <div>
                    <div class="uk-card uk-card-default uk-card-body">
                    <p>Product Quantity</p>
                     <Input placeholder="Quantity" name="Quantity" type="number" /> 
                    </div>
                </div>


               </div>
             
        

           <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
                    
           <div>
               <div class="uk-card uk-card-default uk-card-body">
               <p>Product Category</p>
                   <Input placeholder="Category" name="Category"  type="text"  />
               </div>
           </div>

           <div>
               <div class="uk-card uk-card-default uk-card-body">
               <p>Product Condition</p>
               <Input placeholder="Condition" name="Condition" type="text"  />
               </div>
           </div>


          </div>


          {this.state.userverifyMessage === 'ok' &&   <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
                    
          <div>
              <div class="uk-card uk-card-default uk-card-body">
              <p>Save</p>
                   <SubmitButton  subButton={this.subButton}/>
              </div>
          </div>

 


         </div>}

              


             
            </Form>
            }
          </div>

            </div>
            
          </Fragment>


            <Fragment>

            <div className="tab mt-5 mb-5 uk-background-secondary p-3" style={{display:"none"}} ref={this.tab2}>
            <div className="uk-container">
            {
              this.state.status === 'processing' ? <Completed/> : <Form handleSubmit={this.handleSubmitVisual} >
              
              <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
                    
              <div>
                  <div class="uk-card uk-card-default uk-card-body">
                  <p>Product Description</p>
                      <Textarea Title="Description" name="Description" />
                  </div>
              </div>

              <div>
                  <div className="uk-card uk-card-default uk-card-body">
                  <p>Product Location</p>
                  <Input   type="text"  placeholder="Location" name="Location"  />
                  </div>
              </div>


             </div>


             <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
                    


             <div>
                 <div className="uk-card uk-card-default uk-card-body">
                 <p>Product Images</p>
                 <ImageUpload  imageUrl={this.state.imageUrl} handleUpload={this.handleUpload}/>
                 </div>
             </div>


            </div>


            <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
                    


            <div>
                <div className="uk-card uk-card-default uk-card-body">
                <p>Save</p>
                <SubmitButton   subButton={this.subButton1}/>
                </div>
            </div>


           </div>
              
              </Form>
            }
             
            
            </div>
            </div>

            </Fragment>

            <Fragment>

       <div className="tab uk-background-secondary p-3" style={{display:"none"}} ref={this.tab3}>
            <div className="uk-container">
               <Form handleSubmit={this.handleSubmitPrice}>

            
            <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">

        <div>
            <div class="uk-card uk-card-default uk-card-body">
            <p>Product Listing Price</p>
                <Input   type="number"  placeholder="Listing Price" name="ListedPrice"  />
            </div>
        </div>

              <div>
                  <div class="uk-card uk-card-default uk-card-body">
                  <p>Product Selling Price</p>
                  <Input   type="number"  placeholder="Selling Price" name="SellingPrice" />
                  </div>
              </div>
         </div>

         <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
            <div>
              <div class="uk-card uk-card-default uk-card-body">
              <p>Product Reserve</p>
              <Input   type="number"  placeholder="Reserve" name="Reserve" />
              </div>
          </div>
          </div>

    <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
      <div>
          <div class="uk-card uk-card-default uk-card-body">
          <p>save</p>
          <SubmitButton   subButton={this.subButton2}/>
          </div>
      </div>
      
      </div>
    
            </Form>
            </div>
            </div>

            </Fragment>




            <div className = "d-flex justify-content-end mt-3 mb-3">
           {this.state.currentTab  > 0 && <button className="btn btn-dark m-1 btn-lg" onClick={this.handlePrev}>Prev</button>}
           {this.state.currentTab < 2 && <button  className="btn btn-dark m-1 btn-lg" onClick={this.validation}>next</button> }
            </div>

            </section>
            </Fragment>
        )
    }
}


 
 
 const MapToProps = ({products,filters},props) => {
if(props.location.search){
const value = queryString.parse(props.location.search)
const id = value['?id'] 
   return{
       products:products.find((product)=>product._id === id)
   }
 
 }else{
   return {}
 }

}
 
 
 export default connect(MapToProps)(WizardForm)