## Category: Project
## Link
   * https://chatroom-de811.web.app/  Mobile view also available :)
   * https://youtu.be/v2rBOY-pCtU (Demo)
## Step to reproduce
  Link: [here](https://docs.google.com/document/d/1IxNiWsmE-X5t2-CrKTQ8kuNW9fpzrY0Rcxd-rjcwTZo/edit?usp=sharing)
## Project Stack 
  * Font End: React, Typescipt, React bootstrap, TailwindCSS
  * API/Service: Axios,Socket IO
  * Backend/Database : NodeJS, Express, Firebase Authentication, Firestore (RealTime)
    
## What is the project ?
  * The project stimulate the role based information chatroom, where admins capable of  overseeing/controling users’ activities on different groups and facilitating community engagement among users.
  * Users and group manger can freely chat within members of their group. Also they can switch group when desire.

## Core functionality of the project
  1. *Admin* can change essential info of Users and Group Mangers
      * *Admin* can view rest of users info, such as password/group/role etc. 
      * When *Admin* delete or modify users group/role , the change will reflect on those users immediately 
      * *Admin* can promote user to *Group Manager*, via versa 
           * Authorized *Group Manager* manage assigned groups with *Admin*
  2. *Group Manger* control some part of *User* information
      * *Group Manger* see all users within authorized groups  and allow to kick users out of their group.Eg. We can think users speak something bad in ChatRoom
      * But limited access to important info of *User*. eg. Password
  3. Authentication implemented  between OAuth and SignInWithCustomToken
       * Either sign in with normal info
       * Sign in with FaceBook or Google (account with same email is merged)
  5. Chatroom
      * Users can communicate within assigned group, but they can also communicate with individual
      * *Admin* and *Group Manager* can freely switch between their authorized group to manage users activities
  6. Map 1 UI to many UI
      * Change group of 1 UI reflect on Chatroom/ Setting/ Group Manage of other UI
      * Delete user of 1 UI reflect on Chatroom/Group Manage of other UI
      * Modifying info of 1 UI reflect on Chatroom/ Setting/ Group Manage of other UI
<details>
   <summary><h2>Images</h1></summary>
   <br/>
   <img src="/assets/a1.png"/ width="550" height="660" />
   <hr/>
   <img src="/assets/a2.png"/ width="700" height="660" />
   <hr/>
    <img src="/assets/a3.png"/ width="700" height="660" />
   <hr/>
     <img src="/assets/a4.png"/ width="700" height="660" />
   <hr/>
   <img src="/assets/a5.png"/ width="700" height="660" />

</details>

