import React, { Component } from 'react';

import Toolbar2 from '../Toolbar/Toolbar2';
import {Redirect} from 'react-router-dom';
import MDSpinner from "react-md-spinner";
import './EditProfile.css'
import id from '../Service_File/ngrok'
//import Navbar from './Navbar'
import axios from 'axios'

class Editprofile extends Component{
     constructor(props) {
       super(props);
       this.state ={
         items: [],
         gotohirerachy:false,
         isloaded: false,
         name:'',
         designation:'',
         emp_id:'',
         email:'',
         skill:'',
         contact:'',
         slack_id:'',
         hobbies:'',
         location:'',
         language:'',
        //  manager_id:'',
         projects:'',
         bio:'',
         sample : '',
         loading: true,
         notfound:false,
         error : '',
         message_render:'',
         message:'',
         _isMounted : false,
         gotohome:false,
         gotohomes:false,
         }
       }
       isAuthenticated(){
         const token = sessionStorage.getItem('token_id');
         if (token && token.length > 10){
           return true;
         }

       }
     backdropClickHandler = () => {
  this.setState({sideDrawerOpen: false});
};


 handleChange(event) {
   this.setState({ name:event.target.value });

 }
 handleChange2(event) {
   this.setState({ designation:event.target.value });
 }
handleChange1(event) {
   this.setState({ emp_id:event.target.value.toUpperCase() });
 }
 handleChange3(event) {
   this.setState({ email:event.target.value });
 }
 handleChange4(event) {
   this.setState({ skill:event.target.value });
 }
 handleChange5(event) {
   this.setState({ contact:event.target.value });
 }
 handleChange6(event) {
   this.setState({ slack_id:event.target.value });
 }
 handleChange7(event) {
   this.setState({ hobbies:event.target.value });
 }
 handleChange8(event) {
   this.setState({ location:event.target.value });
 }
 handleChange9(event) {
   this.setState({ language:event.target.value });
 }
 handleChange10(event) {
   this.setState({ manager_id:event.target.value.toUpperCase() });
 }

 handleChange11(event) {
   this.setState({ projects:event.target.value });
 }
 handleChange12(event) {
   this.setState({ bio:event.target.value });
 }
     handleSubmit(event) {
       event.preventDefault();

       const data = {
         name:this.state.name,
         contact:this.state.contact,
         emp_id:this.state.emp_id,
         skill:this.state.skill,
         slack_id:this.state.slack_id,
         location:this.state.location,
         manager_id:this.state.manager_id,
         projects:this.state.projects,
         designation:this.state.designation,
         language:this.state.language,
         hobbies:this.state.hobbies,
         bio:this.state.bio,
       }
       const token = sessionStorage.getItem('token_id');
   const dataupdate = localStorage.getItem('edit_id')
       fetch(`https://${id}.ngrok.io/userupdateview/${dataupdate}` ,{
                method: 'PUT',
                mode:"cors",
                  headers:{
                    'Authorization':token,
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': '*'
                  },
                  body:JSON.stringify(data)
                })
                  .then(res  => res.json()

                  .then(json => {

                    if(res.status === 200 || res.status === 201 || res.status ===400){
                    this.setState({message:json.error})
                    this.setState({message_render:true})
}
else{
  localStorage.clear();
  sessionStorage.clear();
this.setState({gotohomes:true})
}
                })
                )
                 }
                 topFunction() {

                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                }

     componentDidMount() {
        this._isMounted = true;
       const token = sessionStorage.getItem('token_id');
     const datamap = localStorage.getItem('edit_id');
     const response = axios.get(`https://${id}.ngrok.io/userview?client_id=${datamap}`, {
      mode: "cors",
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
      }).then(res => {
        console.log(res);
        console.log(res.status);
        if (res.status === 200 || res.data.status === 201 || res.data.status === 202) {
          const user = this.state.isloaded;
          const persons_view = res.data;
          this.setState({
            isloaded: !user,
            items: persons_view
          })
        }
        else{
          localStorage.clear();
          sessionStorage.clear();
        this.setState({gotohome:true})
        }
      
            // {items.Basic.map((user, index) => 
            //   this.setState({
            //     name:user.name,
            //     email:user.email,
            //     emp_id:user.emp_id,
            //     contact:user.contact,
            //     slack_id:user.slack_id,
            //     hobbies:user.hobbies,
            //     bio:user.bio,
            //   )}
            // )} 
            // {items.Designation.map((des, index) =>
            //   this.setState({
            //     designation:des.designation,
            //   })
            //   )}
            // {items.Location.map((loc, index) =>
            //   this.setState({
            //     location:loc.location,
            //   })
            //   )}
            // {items.Skill.map((skill, index) =>
            //   this.setState({
            //     skill:skill.skill,
            //   })
            //   )}
            // {items.Project.map((pro, index)=>
            //   this.setState({
            //     projects:pro.projects,
            //   })
            //   )}
            // {items.Language.map((lang, index) =>
            //   this.setState({
            //     language:lang.language,
            //   })
            //   )}
            console.log(res.data);
            
             const aa = res.data.Basic[0];
            const bb = res.data.Designation[0];
             const cc = res.data.Language[0];
             const dd = res.data.Location[0];
            const ee = res.data.Project[0];
            const ff = res.data.Skill[0];
             this.setState({
              name:aa.name,
              email:aa.email,
              designation:bb.designation,
              emp_id:aa.emp_id,
              skill:ff.skill,
              contact:aa.contact,
              slack_id:aa.slack_id,
              hobbies:aa.hobbies,
              location:dd.location,
              language:cc.language,
              // //  manager_id:aa.manager_id,
              projects:ee.project,
              bio:aa.bio,
              
             })

         })

         .catch(error => this.setState({notfound: true}))

     }
     componentWillUnmount() {
        this._isMounted = false;
      }

     render(){

      var {
        isloaded,
        items
      } = this.state;

       if(this.state.message_render){
         return(
    <div className="aa">
 <Toolbar2 />

    <div class="page-container">
<form onSubmit={this.handleSubmit.bind(this)}>
  <div style={{backgroundColor:"#408e79",fontSize:'15px'}}>{this.state.message}</div>

    <h1 class="tag_h1">Complete Your Profile</h1>

       <div style={{float:"left", width:"22%", paddingLeft:"14%"}}>

     <h2> <b>Name: </b></h2><input id ='names' type="text" name="name" placeholder="Employee Name" value= {this.state.name}  onChange={this.handleChange.bind(this)}/>
     <h2> <b>Emp_id: </b></h2><input id ='names' type="text" name="emp_id" placeholder="Emp_Id -> NL-007" value= {this.state.emp_id}  onChange={this.handleChange1.bind(this)} required/>
     <h2><b>Contact:</b> </h2>  <input type="text" name="contact"  placeholder="Contact" value={this.state.contact} onChange={this.handleChange5.bind(this)}/>
      <h2><b>Designation: </b></h2><input type="text" name="designation" placeholder="Designation" value={this.state.designation}  onChange={this.handleChange2.bind(this)}/>
      <h2><b>Skill: </b></h2><input type="text" name="skill" placeholder="Skill- C/C++" value={this.state.skill} onChange={this.handleChange4.bind(this)}/>
         <h2> <b>Slack_Id: </b></h2> <input type="text" name="slack_id" placeholder="Slack_Id"  value={this.state.slack_id} onChange={this.handleChange6.bind(this)} />
       <h2> <b>Location: </b></h2>  <input type="text" name="location" placeholder="Location" onChange={this.handleChange8.bind(this)} value={this.state.location} />
        </div>
        <div style={{float:"right", width:"22%", paddingRight:"33%"}}>
     {/* <h2> <b>Manager_Id: </b></h2> <input type="text" name="manager_id" placeholder="Manager_Id -> NL-000" value={this.state.manager_id} onChange={this.handleChange10.bind(this)}/> */}

       <h2> <b>Project: </b></h2> <input type="text" name="project" placeholder="Project"  value={this.state.projects} onChange={this.handleChange11.bind(this)}/>
       <h2> <b>Hobbies: </b></h2>  <input type="text" name="hobbies" placeholder="Hobbies"  value={this.state.hobbies}  onChange={this.handleChange7.bind(this)} />
       <h2> <b>Language: </b></h2>  <input type="text" name="language" placeholder="Language- English" onChange={this.handleChange9.bind(this)} value={this.state.language}/>

     <h2> <b>Bio: </b></h2> <textarea type="text" name="Bio" placeholder="Something about yourself.." style={{height:"80px"}} value={this.state.bio}
onChange={this.handleChange12.bind(this)}/>
        </div>

        <button class='hh'className='button_save'type="submit" value="Add" name="submit" style={{marginRight:"27%"}}>SAVE</button>
</form>

   </div>
   </div>

  );
       }
       if (this.state.notfound ) {

  return(
    <Redirect to={'/'}/>
      )
         }
         if (this.state.gotohome ) {

    return(
      <Redirect to={'/'}/>
        )
           }
           if (this.state.gotohomes ) {

      return(
        <Redirect to={'/'}/>
          )
             }
  let backdrop;


         var{ isloaded } = this.state;
         if (!isloaded) {
         // return <div>loading...</div>;
         return (
           <div>
             <MDSpinner />
           </div>
         );

                }

         else{

           return(

                   <div className="aa">
                <Toolbar2 />

                   <div class="page-container">
<form onSubmit={this.handleSubmit.bind(this)}>
                   <h1 class="tag_h1">Complete Your Profile</h1>

                      <div style={{float:"left", width:"22%", paddingLeft:"14%"}}>

                      {/* <h2> <b>Name: </b></h2><input id ='names' type="text" name="name" placeholder="Employee Name" value= {this.state.name}  onChange={this.handleChange.bind(this)}/> */}
                    <h2> <b>Emp_id: </b></h2><input  id ='names' type="text" name="emp_id" placeholder="Emp_Id -> NL-007" value= {this.state.emp_id}  onChange={this.handleChange1.bind(this)} required/>
                    <h2><b>Contact:</b> </h2>  <input type="text" name="contact"  placeholder="Contact" value={this.state.contact} onChange={this.handleChange5.bind(this)}/>
                    <h2> <b>Designation: </b></h2><input type="text" name="designation" placeholder="Designation" value={this.state.designation}  onChange={this.handleChange2.bind(this)}/>
                    <h2><b>Skill:</b></h2><input type="text" name="skill" placeholder="Skill- C/C++" value={this.state.skill} onChange={this.handleChange4.bind(this)}/>
                        <h2> <b>Slack_Id: </b></h2> <input type="text" name="slack_id" placeholder="Slack_Id"  value={this.state.slack_id} onChange={this.handleChange6.bind(this)} />
                      <h2> <b>Location: </b></h2>  <input type="text" name="location" placeholder="Location" onChange={this.handleChange8.bind(this)} value={this.state.location} />
                       </div>
                       <div style={{float:"right", width:"22%", paddingRight:"33%"}}>
                    <h2> <b>Manager_Id: </b></h2> <input type="text" name="manager_id" placeholder="Manager_Id -> NL-000" value={this.state.manager_id} onChange={this.handleChange10.bind(this)}/>

                      <h2> <b>Project: </b></h2> <input type="text" name="project" placeholder="Project"  value={this.state.projects} onChange={this.handleChange11.bind(this)}/>
                      <h2> <b>Hobbies: </b></h2>  <input type="text" name="hobbies" placeholder="Hobbies"  value={this.state.hobbies}  onChange={this.handleChange7.bind(this)} />
                      <h2> <b>Language: </b></h2>  <input type="text" name="language" placeholder="Language- English" onChange={this.handleChange9.bind(this)} value={this.state.language}/>

                    <h2> <b>Bio: </b></h2> <textarea type="text" name="Bio" placeholder="Something about yourself.." style={{height:"80px"}} value={this.state.bio}
onChange={this.handleChange12.bind(this)}/>
                       </div>

                       <button class='hh'className='button_save'type="submit" value="Add" name="submit" style={{marginRight:"27%"}}>SAVE</button>
</form>

                  </div>
                  </div>

    );
  }
  }
}

export default Editprofile;
