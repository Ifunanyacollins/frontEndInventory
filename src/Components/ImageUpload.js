import React,{Component,Fragment} from 'react'
import {storage} from '../Firebase/firebase'

class ImageUPload extends Component{
    constructor(props){
        super(props)
        this.state = {
           status:'',
           count:''
           
        }
    }



    Progress = (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({count:progress})
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case  'running':
            console.log('Upload is running');
            break;
          default:
            break
        
        }
      }



      ErrorUpload = (error) => {

        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
      
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            console.log('unknow wrror')
            break;
            case 'storage/retry-limit-exceeded':
              this.setState({count:'Upload time out please try again'})
              this.setState({status:'Try again'})
             break
        default:
          break
        }
      }
    
  
 handleFileChange = (e) => {
    
     
     if(e.target.files[0] && (e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpeg")){
        this.setState({status:'uploading..'})
        const upload = storage.ref().child(e.target.files[0].name).put(e.target.files[0])
        upload.on('state_changed',this.Progress,this.ErrorUpload,() => {
         // Upload completed successfully, now we can get the download URL
         upload.snapshot.ref.getDownloadURL().then((downloadURL) => {
             this.props.handleUpload(downloadURL)
             console.log(this.state.imageUrl)
             this.setState({status:'Uploaded'})
         });
       })
         return
     }
    this.setState({status:'please select a photo'})

 }

    render(){
        return(
            <Fragment>
            
            <div className="border uk-border-rounded p-2 mt-5">
            <p>Select Photo of the product</p>
            {this.state.status}
            {this.props.imageUrl.length === 10 ? <p>You Have Reached the maximuim number of photo upload </p> : <div className="uk-margin">
            <div uk-form-custom="true">
                <input type="file" onChange={this.handleFileChange}/>
                <button className="uk-button uk-button-default" type="button" tabIndex="-1">Select</button>
            </div>
           </div>}
          { !!this.state.count && <progress id="js-progressbar" className="uk-progress" value={this.state.count} max="100"></progress> }
            {this.props.imageUrl && <div className="d-flex justify-content-around">{this.props.imageUrl.map((url,index) => <div key={index} className="card uk-width-1-3"><img src={url} className="img-thumbnail card-img-top"  alt="hair" /></div>) }</div>}
            </div>
            
            
            </Fragment>
        )
    }
}

export default ImageUPload;