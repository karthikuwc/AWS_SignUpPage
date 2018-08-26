import React from 'react';

import {Link} from "react-router-dom";

import { update} from 'signupcommon/entry';

import User from "assets/img/resources/page-1-user.svg";
import Tick from "assets/img/resources/page-1-tick.svg"
import Logo from "assets/img/resources/page-1.svg";
import Cross from "assets/img/resources/cross.svg";

import Cryptr from "cryptr"

import "styles/signuppage.css";

import "styles/signupdonepage.css";

class SignInDone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {    
            emailAddress: "",
            fullName: "",
            mobileNumber: "",
            password: "",
            redirect: false,
            err: {
              mes: "",
              vis: "hidden",
              colortxt: "",
              colorbox:""
            }
        };
        
        this.nameChange = this.nameChange.bind(this);
        // this.passwordChange = this.passwordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateCallback = this.updateCallback.bind(this);
        // this.signOutNav = this.signOutNav.bind(this);
    }
  
    nameChange(event) {
        this.setState({fullName: event.target.value});
    }
    
    // passwordChange(event) {
    //     this.setState({password: event.target.value});
    // }
    
    handleSubmit(event) {
      var cryptr = new Cryptr("GlidespotSecret");
      var nameemail = cryptr.decrypt(this.props.match.params.userid).split(",");
      console.log("Update "+nameemail[1]+" "+this.state.name);
      var obj = {
        UserPoolId: "ap-southeast-1_TB9GVW9nj",
        ClientId: "2a57aiojrldeloo774oritg30i",
        Name: this.state.fullName,
        password: this.state.password,
        Email: nameemail[1]
      }
      
        update(obj, this.updateCallback, this);
        console.log(JSON.stringify(obj));
        event.preventDefault();
    }
    
    updateCallback(res) {
      if (res == "SUCCESS") {
        this.setState({
          err: {
            mes: "Details updated successfully!",
            vis: "visible",
            colortxt: "#23a36e",
            colorbox:"#dbf2ed"
          }
        });
      }
      else {
        this.setState({
          err: {
            mes: res,
            vis: "visible",
            colortxt: "#d0021b",
            colorbox:"#fbd2d3"
          }
        });
      }
    }
    
    // signOutNav() {
    //     var obj = {
    //         UserPoolId: "ap-southeast-1_TB9GVW9nj",
    //         ClientId: "2a57aiojrldeloo774oritg30i",
    //         Email: this.props.pass.email
    //     }
    //     console.log(this.props.pass.email);
    //     signOut(obj);
    //     this.setState({redirect: true});
    // }
    
    
    render() {
    
        console.log("Rendering Sign Up Container");
        
        document.body.style.backgroundColor = "#ecf7f5";
        var userid;
        if(this.state.err.vis == "visible") {
          var cryptr = new Cryptr("GlidespotSecret");
          userid = cryptr.encrypt(this.state.fullName+","+this.state.emailAddress);
        }
        else {userid = this.props.match.params.userid}

        
        // if (this.state.redirect === true) {
        //   console.log('redirecting...to home');
        //   return (<Redirect to='/' />)
        // }
        
        return (
            <span>
              <div className="signuppage">
                <nav className="navbar navbar-default navbar-static-top" >
                  <div className="navbar-header">
                       
                  </div>
                  <a className="navbar-brand nav navbar-nav" href="#" id="navbar">GlideSpot Account</a>
                  <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                      <li><Link to={"/d/"+userid+"/router1"}><img src={Cross} className="cross"/></Link></li> 
                    </ul>
                  </div>
                </nav>
                <img src={Logo} className="plane"/>
            </div>
            <span className="signupdonepage">
              <div>
                <div className="container error-msg col-centered" style={{visibility:this.state.err.vis, backgroundColor:this.state.err.colorbox}}>
                    <p style={{color:this.state.err.colortxt}}>
                      {this.state.err.mes}
                    </p>
                </div>
                <div className="container col-centered">
                  <div className="row panel-body">
                    <img src={Tick} className="page-2" />
                    <div id="sign-up">
                      <h2 style={{color: '#6d6e71', fontSize: '13px'}}>Update your details:</h2>
                    </div>
                    <form>
                        <div className="input-group" style={{margin: '7% 5%'}}>
                          <span className="input-group-addon"><img src={User} className="page-1" /></span>
                          <input type="text" name="name" id="name" tabIndex={1} className="form-control" placeholder="Enter Full Name" 
                          value={this.state.fullName} onChange={this.nameChange}/>
                        </div>
                        {/*<div className="input-group">
                          <span className="input-group-addon"><img src="../resources/key-icon.svg" className="page-1" /></span>
                          <input type="password" name="password" id="password" tabIndex={3} className="form-control" placeholder="Enter a Password" 
                          value={this.state.password} onChange={this.passwordChange}/>
                        </div>*/}
                        <div className="form-group" style={{marginTop: '4.8%'}}>
                            <button onClick={this.handleSubmit} className="btn btn-primary" style={{backgroundColor: '#3e8370', width: 320, height: 40}}>Submit</button>
                        </div>
                    </form>
                  </div>
                </div>
                {/*<div id="sign-in">
                  <a className="link" onClick={this.signOutNav}>Sign-out</a>
                </div>*/}
             </div>
            </span>
            </span>
        )
    }
}

export default SignInDone;
