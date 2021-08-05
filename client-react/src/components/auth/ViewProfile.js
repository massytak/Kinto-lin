import React, { Component } from 'react'
import {Link} from "react-router-dom"
class ViewProfile extends Component {
  state={
    id:this.props.match.params.id
  }
  render() {
    
    const divstyle={
      paddingTop:"5em",
      color:"red",
      backgroundColor:"yellow"
    }
    return (
      <div style={divstyle}>
        <h3>Voir le profile</h3>
        <Link to={{pathname:`/editprofil/${this.state.id}`}}>
        <button>
          edit my profile
        </button>
        </Link>
      </div>
    )
  }
}

export default ViewProfile
