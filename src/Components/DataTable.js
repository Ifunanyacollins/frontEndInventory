import React ,{Fragment,Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {sortByUp,sortByDown,SortByText} from '../Actions/Filters'
import FilterTunnel from '../Selection/FilterTunnel'
import Pagination from '../Pagenantion/page'
import  CustomModal from './Modal'


class DataTable extends Component{
    constructor(props){
        super(props)
        this.state = {
            text: '',
            end:10,
            start:0,
            length:props.products.length,
            open:false,
            id:''
        }
    }

    handleOpen = (id) => {
      this.setState({id})
      this.setState({ open: true });
    };
  
    onCloseModal = () => {
      this.setState({ open: false });
    };

    handleText = (e) => {
        this.setState({text:e.target.value})
        this.props.SortByText(e.target.value)

    }

    handleNext = () => {
        console.log(this.state.length)
        console.log(this.state.end)
        if(this.state.end >= this.state.length){
            return false
        }
      this.setState((prevState)=>(
         { end:prevState.end + 10 }
      ))


      this.setState((prevState)=>(
        { start:prevState.start + 10 }
     ))
    }


    handlePrev = () => {
        if(this.state.start === 0){
            return false
        }
        this.setState((prevState)=>(
           { end:prevState.end - 10 }
        ))
  
  
        this.setState((prevState)=>(
          { start:prevState.start - 10 }
       ))
      }

    render(){
        return (
            <Fragment>
            <div className="uk-container mb-5 mt-5">
               <h1 className="uk-text-lead">Product Page</h1>             
            </div>
            <div className="uk-container" >
             {this.state.end <= this.state.length && <button onClick={this.handleNext} className="btn btn-dark">next</button> }
              {this.state.start !== 0 && <button onClick={this.handlePrev}  className="btn btn-dark">prev</button>}
            </div>
            <div className="uk-container d-flex justify-content-end uk-child-width-1-3">
            <input type="text" className="form-control" value={this.state.text} onChange={this.handleText} />
            </div>
            <div className="uk-container uk-overflow-auto">
            <table className="uk-table uk-table-striped uk-table-hover">
            <thead>
            <tr>

               {this.props.tableHead.map((head,index) =>(
                <th >
                <div key={index} >
                <span>{head}</span>
                <span className="uk-flex uk-flex-column">
                <span uk-icon="triangle-up" onClick={() => this.props.sortByUp(head)}></span>
                <span uk-icon="triangle-down" onClick={ () => this.props.sortByDown(head)}></span>
                </span>
                </div>
                </th>) )  }
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>

          {
        FilterTunnel(Pagination(this.props.products,this.state.start,this.state.end),this.props.filters).map(({SKU,Status,SellingPrice,Category,Title,_id},index)=>
          <tr  key={index}>
          <td>{Status}</td>
            <td>{Title}</td>
            <td>{Category}</td>
            <td>{SellingPrice}</td>
            <td><Link to={Status !== 'Item Available' ? `/create?id=${_id}` : `/update/${_id}`}>{SKU}</Link></td>
            <td className="uk-text-danger"><i className="fas fa-trash-alt" onClick={() => this.handleOpen(_id)} ></i></td>
            </tr> )}

            </tbody>
            </table>
            </div>
            <CustomModal  open={this.state.open}  onCloseModal={this.onCloseModal} id={this.state.id}/>
            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch,props)=>({
   sortByUp: (word) => dispatch(sortByUp(word)),
   sortByDown:(word)=> dispatch(sortByDown(word)),
   SortByText:(text) => dispatch(SortByText(text)),
})
  
  
  const MapToProps = ({products,filters}) => {
    return{
        products,
        filters
    }
  
  }
  
  
  export default connect(MapToProps,mapDispatchToProps)(DataTable)