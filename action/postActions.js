import {
  NEW_POST
} from './types';
import axios from 'axios'
import id from '../components/Service_File/ngrok';

export const createPost = (postData, token, acces) => async dispatch => {
  const bearer = token;
  const access_token = acces;
  return new Promise((resolve, reject) => {
  axios.post(`https://${id}.ngrok.io/userlogin`, postData, {
       method:"POST",
        mode: "cors",
        headers: {
          'access-token': access_token,
          'Authorization': bearer,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(postData)
      })
      .then((response) => {
        resolve(response);

        dispatch({
          type: NEW_POST,
          payload: response.data,
        })
      })
    // return (<Redirect to={"*"}/>)
    // console.log("action called");
    //           type:NEW_POST,
    //       payload: postData.token,
  });
}
