import React, {Component,Fragment} from 'react'
import DataTable from './DataTable'
import Header from './Header'



class View extends Component {

    render(){
        return(
            <Fragment>
            <Header />
            <DataTable tableHead={['Status','Title','Category','SellingPrice','SKU']} />
            </Fragment>
        )
    }
}

export default View;