Simple spring and react app, this developer version for testing,

<h2>Run app</h2>
Clone repository, install dependencies in freontend folder npm install, and run app npm run start in port 3000.

<h2>Deploy app</h2>
If you want deploy this app e.g. in Heroku you have to make production version of React app npm run build, and put this bundle in static folder in your spring app. Remember that before build app remove proxy from package.json, becaouse app will be hosted on spring port (8081 not in client port 3000)
