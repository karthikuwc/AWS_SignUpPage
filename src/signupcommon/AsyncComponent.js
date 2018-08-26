import React, { PureComponent } from 'react';
import {LoadingIndicator, Loading} from './LoadingIndicator';
import Loadable from 'react-loadable';

export default class  extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      Component: null
    };
  }
  
  componentWillMount() {
    if(!this.state.Component) {
        console.log("in async");
        this.setState({Component: LoadingIndicator});
        var Component;
        var that = this;
        setTimeout(function() {
          Component = Loadable({
          loader: that.props.moduleProvider,
          loading: Loading,
          delay:0
          });
          that.setState({Component: Component});
        }, 1000);
        
        // const Component = Loadable({
        //   loader: this.props.moduleProvider,
        //   loading: Loading,
        //   delay:5000
        // });
      
        // this.setState({Component});
        
    }
  }

  render() {
    const { Component } = this.state;
    console.log("Rendering Async");
    //The magic happens here!
    return (
      <div>
        { <Component pass={this.props.pass} />}
      </div>
    );
  }
}