## Category: Project
## Link
   [https://chatroom-de811.web.app/](https://chatroom-de811.web.app/)   Mobile view also available :)
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
  1. Admin can change essential info of Users and Group Mangers
      * Admin can view rest of users info, such as password/group/role etc. 
      * When Admin delete or modify group/role of User/Group Manger, the change will reflect to those users immediately 
      * Admin can promote user to Group Manager, via versa 
      * Admin can assign authorized group to Group Manager, so Group Managers can help manage User with Admin.
  2. Group Manger control some part of User information
      * Group Manger can see all users within authorized group  and allow to kick users out of their group.Eg. We can think users speak something bad in ChatRoom
      * But limited access to essential info of User, eg. Passwords 
  3. Authentication implemented  between OAuth and SignInWithCustomToken(using self sign in/sign up information)
  4. Chatroom, users can communicate together within group assigned.
      * Users can communicate within assigned group, but they can also communicate with individual/
      (Individuality chat funtionality functioned thanked to Observable of Firestore aka RealTime Database)
      * Admin and Group Manager can freely switch between their authorized group to manage users activities 
