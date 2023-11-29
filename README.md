## Link
[https://chatroom-de811.web.app/](https://chatroom-de811.web.app/)   Mobile view also available :)
## Step to reproduce
### npm package
- install npm package, if your local machine don't have it yet. https://nodejs.org/en/download
  - use "npm -v" to check your machine has npm
### Download and run in development
1. Download the file in VSCode
3. open VSCode terminal, with following command "npm i" (install node modules library )
4. Create your own Firebase Service and API keys 
     1. Open link https://firebase.google.com/
     2.  Click "get started" and "+ project" to create a new service
     3. On top right, click "Project Overview" (next to setting icon)
         * This page include your projectID, projectName, and Web API Key
    4. In General Tap, scroll down and you can see "Add App"
       * following the instruction until create an App
       * Once you done you should have the App Config code like [This](https://dev.to/nicolasmontielf/how-setup-firebase-on-your-frontend-project-1ap)
    5. Copy only firebaseConfig, then paste into ${rootDirectory}/src/route_services/service_fun
         * You can see I leave those blank, since if you start in dev environment, you need your own API Key for Client Service
    6. Now, In "Firebase setting", navigate to from "General" to "Service Account" [tab](https://firebase.blog/posts/2016/11/bringing-firebase-to-your-server/)
        * Click "Generate New Private Key"
        * Wait for the download, it generate a json file with API Key for Service Account. This key is different from API Key for Client Service.
    8. Copy the JSON file and paste into  ${rootDirectory}/src/route_services/AdminService.json
    9. DONE. with setting up API Keys with Firebase :)
6. Back to VSCode, command "npm run dev" to start.
   
  
