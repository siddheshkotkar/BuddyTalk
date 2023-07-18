import React from 'react'
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

// import ChannelContainer from './components/ChannelContainer';
// import ChannelListContainer from './components/ChannelListContainer';

import { ChannelContainer, ChannelListContainer, Auth} from './components';

import 'stream-chat-react/dist/css/index.css';
import './App.css';

import { useState } from 'react';

const cookies = new Cookies();

const apikey = '9d82v39f6jan';
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apikey);

if(authToken) {
  client.connectUser({
    token: cookies.get('token'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    id: cookies.get('userId'),
    phoneNumber: cookies.get('phoneNumber'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword')
  }, authToken)
}

const App = () => {

  const [createType, setCreateType] = useState('');
  const[isCreating, setIsCreating] = useState(false);
  const[isEditing,setIsEditing] = useState(false);


  if(!authToken)
    return <Auth/>
  
  console.log(setCreateType);
  return (
    
    <div className="app__wrapper">
      {console.log("hello")}
        <Chat client={client} theme="team light">
             <ChannelListContainer
              isCreating = {isCreating}
              setIsCreating = {setIsCreating}
              
              setCreateType = {setCreateType}

              setIsEditing = {setIsEditing}
            
            /> 
            <ChannelContainer
              isCreating = {isCreating}
              setIsCreating = {setIsCreating}
              isEditing = {isEditing}
              setIsEditing = {setIsEditing}
              createType = {createType}
            />
        </Chat> 
    </div>
  )
}

export default App
