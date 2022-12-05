# Route Zero Enterprise Carbon Savings Prediction
## Index

- [Overview](#overview)
- [Starting our app](#startup-guides)
- [Starting our frontend](#starting-our-frontend)
- [Starting our backend](#starting-our-backend)
- [Concept and planning](#concepts-and-planning)
- [User journeys](#user-journeys)
- [Group notes and Gantt chart](#group-notes-and-gantt-chart)


## Overview

_RouteZero's route planning, carbon analytics, and social media tools help your company cut business travel time & cost, while reaching your Net-Zero goals._ - [RouteZero](https://enterprise.routezero.world/)

Businesses lack access to a tool that can empirically guide them towards net-zero with respect to their biggest source of emission: travel. Up until now this is a process guided at least in part and sometimes solely by intuition. This is an inefficient process in terms of time and cost, and our tool will provide a better alternative. \
The Enterprise Carbon Savings Prediction web application aims to provide accurate predictions of how a company's carbon footprint will reduce as their employees switch to low-carbon travel. \
This will have two main components:
- Front-end created in React
- A backend API in SpringBoot to interface with RouteZero's API



## Startup guides


## Starting our Frontend

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## Starting our Backend

### Getting the server running

### Terminal
On your terminal:
1. Navigate to the **./server** folder
2. Run `./mvnw spring-boot:run`

### IntelliJ (Alternative)
Using IntelliJ's builtin terminal:
1. Navigate to the **./server** folder
2. Type `mvn spring-boot:run` (Text should be highlighted in yellow now)
3. Run the command by pressing `⌘`+`⏎` on macOS or `Ctrl`+`Enter` on Windows and Linux

Note that the server will run on port 8080 by default.
To change that, change the value of `server.port` in the *application.properties* file in **./server/src/main/resources**


## Concepts and planning
### Early design diagrams
![image](https://user-images.githubusercontent.com/45922387/201781191-0ab142ed-e5b4-4942-87ea-2bc93bbc2091.png)
![image](https://user-images.githubusercontent.com/45922387/201781254-fe7f4a76-d90c-4204-8037-f001b6d83f12.png)
![image](https://user-images.githubusercontent.com/45922387/201781291-5eaae519-c5ae-4c30-b8a0-703d28cc5aab.png)


## User Journeys
**Small climate-conscious business**, visits website looking for a cost-effective way to make as large an impact on their emissions as possible. They land on the [main page](https://enterprise.routezero.world/) and discover that travel contributes largly to corporate emissions.\
They will be able to access the landing page of our app where they will be able to upload their travel data as a ``csv`` file. This travel data will ideally look like journeys of their employees over a representative period of time.\
They get back a panel containing two graphs on the right, and a selection of policies to enforce low-carbon travel. By selecting these policies the company is able to manage effect against budget. This is a small company that may not have the incentive or capital to go all in, and our app will allow them to start small.

**Large incentivized business**, the journey will look similar. They may have a lot more data, which will possibly afford them more policy options that display on their left.


## Group notes and Gantt chart
[View our group notes](https://succinct-structure-02b.notion.site/SPE-group-notes-1d5c154901614994adeb4df74cc76579) (Notion) \
[View our Gantt chart](https://uob-my.sharepoint.com/:x:/g/personal/ai20192_bristol_ac_uk/EQ2tWVFm5X9EnJw5EIE3zg8BsSrJ3WRx1I6BgtUecnVbBg?e=OYrvjc) (Excel)\
If you are unable to access/edit either of these, and feel you should be able to, you may [request access](mailto:np21862@bristol.ac.uk).
<<<<<<< HEAD
=======

## Run this app
[Starting our Frontend](https://github.com/spe-uob/2022-RouteZeroCarbonSavings/blob/dev/frontend/route-zero-enterprise/README.md) \
[Starting our Backend](https://github.com/spe-uob/2022-RouteZeroCarbonSavings/blob/main/backend/README.md)
>>>>>>> 88ea8a235c7109312a870a66befb48f7883dda24
