import React, { Component } from "react";
import { signup } from "./auth-service";
import { Link } from "react-router-dom";
import { handleUpload } from "./auth-service"
// import { saveNewThing } from "./auth-service"
class Signup extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    err: null,
    imageUrl:"",
    errImage:null
  };

  // handleSubmit()
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    const email = this.state.email;
    const image=this.state.imageUrl

    if (!image){
     this.setState({errImage:"Your image is note upload Please Wait to change..."})
    }else{
      signup(username, password, confirmPassword, email,image)
        .then((response) => {
          console.log("coucou");
          this.setState({
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
            imageUrl:""
          });
          this.props.updateUser(response);
          this.props.history.push("/home");
        })
        //     .catch((error) => console.log(error));
        .catch((error) => {
          this.setState({ err: error.response.data.message });
          setTimeout(() => {
            this.setState({
              err: null,
            });
          }, 3000);
        });

    }

  };
  //handlefiluploud()
  handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("image", e.target.files[0]);

    handleUpload(uploadData)
      .then((response) => {
        
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ imageUrl: response.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };
  // handleChange()
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const divstyle={
      backgroundColor:"red",
      paddingTop:"4em"
    }
    return (
      // form design
      <div style={divstyle}>
        {/* HERE */}
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={(e) => this.handleChange(e)}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={(e) => this.handleChange(e)}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}
          />

          <label> Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={(e) => this.handleChange(e)}
          />
          <label>Avatar</label>
          {/* <label> Upload your picture</label>
        <input type="file" value ={this.state.imahe} onChange={e=> this.handleChange(e)} /> */}
          <input type="file" onChange={(e) => this.handleFileUpload(e)} />
          <button>I Signup</button>
        </form>
        <p>{this.state.err}</p>
        <p>
          Already have account?
          <Link to={"/login"}>Login</Link>
        </p>
        {this.state.errImage && <p>{this.state.errImage}</p>}
      </div>
    );
  }
}
export default Signup;