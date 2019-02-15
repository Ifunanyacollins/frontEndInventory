import React from 'react';
import Modal from 'react-responsive-modal';
import {connect} from 'react-redux'
import { SetDeleteProduct } from '../Actions/Product';
import App from '../App.css'

const CustomModal =  (props) => (
    <div>
    
    <Modal 
    open={props.open} 
    onClose={props.onCloseModal} 
    center
    classNames={{
        transitionEnter: App.transitionEnter,
        transitionEnterActive: App.transitionEnterActive,
        transitionExit: App.transitionExitActive,
        transitionExitActive: App.transitionExitActive,
      }}
      animationDuration={1000}
    >
      <h2 className="uk-text-lead uk-text-center">Are you sure u want to delete this product?</h2>
      <div className="d-flex justify-content-center">
      <button className="uk-button uk-button-primary" onClick={props.onCloseModal}>cancle</button>
      <button className="uk-button uk-button-danger" 
      onClick={()=>{
        props.SetDeleteProduct(props.id)
        props.onCloseModal()
      }
    }
      >
        Yes
        
        </button>
      </div>
    </Modal>
  </div>
)


const mapDispatchToProps = (dispatch,props)=>({
  SetDeleteProduct:(id) => dispatch(SetDeleteProduct(id))
})
 
 
 const MapToProps = ({products,filters}) => {
   return{
       products,
       filters
   }
 
 }
 
 
 export default connect(MapToProps,mapDispatchToProps)(CustomModal)