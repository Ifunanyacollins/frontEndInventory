import React, {Fragment} from 'react'


export const Form = (props) => (
 <Fragment>
  <form onSubmit={props.handleSubmit} className=" pl-2 p-2">
       {props.children}
  </form> 
 </Fragment>
)

export const Input = (props) => (
    <Fragment>
    <input type={props.type} className="form-control"  onChange={props.handleChange} placeholder={props.placeholder} name={props.name}  required={true} value={props.value}  readOnly={props.readonly}/>
    </Fragment>
)

export const  Textarea = (props) => (
       <Fragment>
       <div className="form-group">
       <label htmlFor={props.Title}>{props.Title}</label>
       <textarea className="form-control" id={props.Title} onChange={props.handleChange} value={props.value} name={props.name} rows="3" require="true"></textarea>
       </div>
       </Fragment>
)

export const SubmitButton = (props) => (
    <Fragment>
    <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-primary btn-lg"   ref={props.subButton} onClick={props.handle}>save</button>
    </div>
    </Fragment>
)


export  const  Completed = () => (
    <Fragment>
    <div className="uk-grid-match uk-child-width-expand@m" uk-grid="true">
                   
    <div>
        <div className="uk-card uk-card-default uk-card-body">
            <p className="uk-text-center uk-text-lead">Section completed</p>
        </div>
    </div>
    </div>
    </Fragment>
)