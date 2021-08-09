import react from 'react';
import {Delete} from './auth-service';
import { userInfo } from "./auth-service";


class Delete extends Component{

state = {

id: this.props.match.params.id,

};

handleDeleteUser = (event) => {

event.preventDefault();

Delete(this.state.id)

.then((logout) => {

    this.props.history.push(`/`);

})

.catch((err) => console.log(err));

};

componentDidMount() {

this.state.id.then((userInfo) => {

this.setState({
 

username: userInfo.username,

email: userInfo.email,

password: userInfo.password,

confirmPassword:userInfo.confirmPassword,

imageurl: userInfo.imageUrl

});

});

}

handleChange = (event) => {

const { name, value } = event.target;

this.setState({ [name]: value });

};

render(props){

return(

<div>

<button
                      className="buttonLogout"
                      onClick={(e) => {
                        Delete().then(() => {
                          props;
                        
                        });
                      }}
                    
                      />
</div>

)

}

}

export default Delete


