import React ,{Fragment,Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Textarea, Input,SubmitButton} from './Forms'
import ImageUpload from './ImageUpload'
import Header from './Header'

class Update extends Component{
    constructor(props){
        super(props)
        this.state = {
    Status:props.products.Status,
    SKU:props.products.SKU,
    Condition:props.products.Condition,
    Brand:props.products.Brand,
    ModelNumber:props.products.ModelNumber,
    Dimensions:props.products.Dimensions,
    Weight:props.products.Weight,
    Quantity:props.products.Quantity,
    Title:props.products.Title,
    Category:props.products.Category,
    Description:props.products.Description,
    Images:props.products.Images,
    ListedPrice:props.products.ListedPrice,
    SellingPrice:props.products.SellingPrice,
    Reserve:props.products.Reserve,
    Location:props.products.Location,
        }

        this.subButton = React.createRef();
    }

    handleUpload = (downloadURL) => {
  
        this.setState((prevState)=>(
          {Images:[
              ...prevState.imageUrl,
              downloadURL
          ]
         
         }))
      }

      handleOnSave = (e) => {
        e.target.textContent = 'Saving....' 
         const data = this.state
         axios.post(`http://localhost:5000/api/update?id=${this.props.products._id}`,data).then(({data})=>{
           this.subButton.current.textContent = 'saved'
         })
       }

    handleChange = (e) => {
        const name = e.target.name
        this.setState({[name]:e.target.value})
    }



    render(){
        return(
            <Fragment>
            <Header />
            <section className="uk-section uk-section-secondary uk-preserve-color">
            <div className="uk-container">

                <div className="uk-panel uk-light uk-margin-medium">
                <h3>SKU <Input value={this.state.SKU} type="text" readonly={true}  /></h3>
               </div>

               <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
                   
                <div>
                    <div className="uk-card uk-card-default uk-card-body">
                        <p>Product Title</p>
                        <Input placeholder="Title"  name="Title" type="text"  value={this.state.Title} handleChange={this.handleChange} />
                    </div>
                </div>

                <div>
                    <div className="uk-card uk-card-default uk-card-body">
                    <p>Product Brand</p>
                     <Input placeholder="Brand" name="Brand" type="text" value={this.state.Brand}  handleChange={this.handleChange}/>
                    </div>
                </div>


               </div>



               <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
                   
                <div>
                    <div className="uk-card uk-card-default uk-card-body">
                        <p>Product Model Number</p>
                        <Input placeholder="Model Number" name="ModelNumber" type="text" handleChange={this.handleChange} value={this.state.ModelNumber} />
                    </div>
                </div>

                <div>
                    <div className="uk-card uk-card-default uk-card-body">
                    <p>Product Dimensions</p>
                     <Input placeholder="Dimensions" name="Dimensions" type="text"  handleChange={this.handleChange}  value={this.state.Dimensions} />
                    </div>
                </div>


               </div>



               <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
                   
                <div>
                    <div className="uk-card uk-card-default uk-card-body">
                        <p>Product Weight</p>
                        <Input placeholder="Weight" name="Weight" type="text" handleChange={this.handleChange}  value={this.state.Weight} />
                    </div>
                </div>

                <div>
                    <div className="uk-card uk-card-default uk-card-body">
                    <p>Product Quantity</p>
                     <Input placeholder="Quantity" name="Quantity" type="number"  handleChange={this.handleChange} value={this.state.Quantity} /> 
                    </div>
                </div>


               </div>

               

               <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
                    
                <div>
                    <div className="uk-card uk-card-default uk-card-body">
                    <p>Product Category</p>
                        <Input placeholder="Category" name="Category" handleChange={this.handleChange} type="text" value={this.state.Category}  />
                    </div>
                </div>

                <div>
                    <div className="uk-card uk-card-default uk-card-body">
                    <p>Product Images</p>
                    <ImageUpload  imageUrl={this.state.Images} handleUpload={this.handleUpload}/>
                    </div>
                </div>


               </div>





               <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
                    
               <div>
                   <div className="uk-card uk-card-default uk-card-body">
                   <p>Product Description</p>
                       <Textarea Title="Description" name="Description" handleChange={this.handleChange} value={this.state.Description} />
                   </div>
               </div>

               <div>
                   <div className="uk-card uk-card-default uk-card-body">
                   <p>Product Location</p>
                   <Input   type="text"  placeholder="Location" name="Location" handleChange={this.handleChange} value={this.state.Location} />
                   </div>
               </div>


              </div>    
              
              


              <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
                    
              <div>
                  <div className="uk-card uk-card-default uk-card-body">
                  <p>Product Listing Price</p>
                      <Input   type="number"  placeholder="Listing Price" name="ListedPrice" handleChange={this.handleChange} value={this.state.ListedPrice}  />
                  </div>
              </div>

              <div>
                  <div className="uk-card uk-card-default uk-card-body">
                  <p>Product Selling Price</p>
                  <Input   type="number"  placeholder="Selling Price" name="SellingPrice" handleChange={this.handleChange} value={this.state.SellingPrice} />
                  </div>
              </div>


             </div>  


             <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
             
             <div>
                 <div className="uk-card uk-card-default uk-card-body">
                 <p>Product Reserve</p>
                     <Input   type="number"  placeholder="Reserve" name="Reserve" handleChange={this.handleChange} value={this.state.Reserve} />
                 </div>
             </div>


        <div>
             <div className="uk-card uk-card-default uk-card-body">
             <p>Product Condition</p>
                <Input   type="text"  placeholder="Condtion" name="Condition" handleChange={this.handleChange} value={this.state.Condition} />
             </div>
         </div>

            </div> 

            <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
                        <div>
                            <div className="uk-card uk-card-default uk-card-body">
                            <SubmitButton  subButton={this.subButton} handle={this.handleOnSave}/>
                            </div>
                        </div>
            </div>
            </div>

        
            
            </section>
            </Fragment>
        )
    }
}


const MapToProps = ({products,filters},props) => {
   const id = props.match.params.id
       return{
           products:products.find((product)=>product._id === id)
       }
     
    
    }
     
     
     export default connect(MapToProps)(Update)


