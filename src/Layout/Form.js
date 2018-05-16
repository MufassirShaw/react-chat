import React, { Component } from 'react';
class Form extends Component {
    componentDidMount() {
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.setUser({
                name:e.target.name.value,
            });
    }

    render(){ 
        return( 
             <div>
                <div className="loginForm"> 
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <input name="name" className="form-control col-md-10 col-sm-9" id="name" placeholder="You are???"/>
                            <input type="submit" className="btn btn-primary app-btn  col-md-2 col-sm-3"  value="Submit"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

 
export default Form;
