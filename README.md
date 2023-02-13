# Route Zero Enterprise Carbon Savings Prediction
## Index
- [Overview](#overview)
- [Starting our app](#startup-guides)
- [Starting our frontend](#starting-our-frontend)
- [Starting our backend](#starting-our-backend)
- [Docker Images](#docker-images)
- [Concept and planning](#concepts-and-planning)
- [User journeys](#user-journeys)
- [Group notes and Gantt chart](#group-notes-and-gantt-chart)

----
## Overview

_RouteZero's route planning, carbon analytics, and social media tools help your company cut business travel time & cost, while reaching your Net-Zero goals._ - [RouteZero](https://enterprise.routezero.world/)

Businesses lack access to a tool that can empirically guide them towards net-zero with respect to their biggest source of emission: travel. Up until now this is a process guided at least in part and sometimes solely by intuition. This is an inefficient process in terms of time and cost, and our tool will provide a better alternative. \
The Enterprise Carbon Savings Prediction web application aims to provide accurate predictions of how a company's carbon footprint will reduce as their employees switch to low-carbon travel. \
This will have two main components:
- Front-end created in React
- A backend API in SpringBoot to interface with RouteZero's API

### Repository Structure

```
├── backend
│   ├── README.md
│   ├── server
│   └── server.iml
├── docs
│   ├── ETHICS.md
│   └── stakeholders-and-user-stories.txt
├── frontend
│   ├── package-lock.json
│   └── route-zero-enterprise
├── LICENSE.md
└── README.md

```

## Startup guides


## Starting our Frontend

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Installing dependancies (prerequisite)

Before you can run any of the below, please run ``npm install`` in **this directory**. 

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

If you're testing the frontend with a locally hosted backend, to avoid CORS issues, please visit the website in Chrome by starting it with the following settings, from console:
- Ubuntu: ``google-chrome --disable-site-isolation-trials --disable-web-security --user-data-dir="~/tmp"``
- Windows: ``todo``

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

## Docker Images

### For the Frontend

The ``docker compose`` instructions are **depricated** as there was no need for a multistage build.

To generate and run just the frontend image, observe the following steps: 
- start the docker desktop app
- find ``frontend/route-zero-enterprise/``
- select a name for the image, here ``<docker_username>/frontend:latest`` is used
- run ``docker build --tag <docker_username>/frontend:latest . && docker run -p 3000:3000 <docker_username>/frontend:latest``

If no errors were thrown, visitng ``localhost:3000`` brings you to the production build of our React app served by NGINX.

Note this site will not function beyond the landing page as without the backend running it is not able to make requests to RouteZero's API.

### For the Backend

To generate and run just the backend image, observe the following steps:
- start the docker desktop app
- find ``backend/server/``
- select a name for the image, here ``<docker_username>/backend:latest`` is used
- run ``docker build --tag <docker_username>/backend:latest . && docker run -p 8080:8080 <docker_username>/backend:latest``

If no errors were thrown, the backend is now running and bound to port ``8080``. To test this, you may, for example, start the frontend via ``npm run start`` and notice that the full app works. 

### For the whole app

To generate and run the whole application, observe the following steps: 
- start the docker desktop app
- find ``/``, the root of the project 
- select a name for the image, here ``<docker_username>/fullstack:latest`` is used
- run ``docker build --tag elliotmb/fullstack_app:latest . && docker run -p 3000:3000 -p 8080:8080 elliotmb/fullstack_app:latest ``

Visit ``localhost:3000`` to use the full app. 

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

## User Stories of RouteZero
**Carbon calculator: enterprises with unknown travel emissions**
Small to Medium Sized Enterprises (SMEs) are not required to track their travel emissions, and so many are unaware of how large their travel emissions are. In this case, the tool allows staff (e.g. sustainability manager, founder, etc) to enter travel information they have readily available, and receive an accurate estimate of their travel emissions. This helps the SME understand where their emissions come from, and whether travel should be a priority.

**Carbon calculator: more accurate emissions estimates**
Many SMEs rely on carbon calculators that use a “spend-based” method to calculate total company emissions. However, these calculators produce inaccurate estimates (spend is a less than ideal proxy for carbon emissions). In this case, the tool allows staff (e.g. sustainability manager, founder, etc) to enter travel information they have readily available, and receive a more accurate estimate of their travel emissions. This helps ensure the SME can tackle their whole footprint - i.e. that they’re not underestimating their emissions.

**Providing unique insight**
Many large businesses (1000+ employees) have dedicated sustainability teams and have a good understanding of where their emissions come from (e.g. manufacturing, offices, travel, etc). However, due to a lack of data, these sustainability teams find it hard to estimate costs and carbon savings for different interventions (e.g. only allowing economy flights under 500 miles, running monthly competitions for carbon savings, introducing carbon budgets, etc). In this case, the tool helps a large enterprise understand the cost and carbon implications for adopting RouteZero, and various carbon cutting interventions.

**Conflict resolution**
Large organisations (250+ employees) usually have separate teams for sustainability and procurement/travel management, each with separate KPIs - sustainability teams focus on trying to cut emissions, while procurement try to drive down business running costs. This may lead to conflict when these goals are opposed, e.g. adopting a more expensive procedure to cut emissions. In this case, the tool helps enterprises find carbon cutting measures, while minimising costs.


## Group notes and Gantt chart
[View our group notes](https://succinct-structure-02b.notion.site/SPE-group-notes-1d5c154901614994adeb4df74cc76579) (Notion) \
[View our Gantt chart](https://uob-my.sharepoint.com/:x:/g/personal/ai20192_bristol_ac_uk/EQ2tWVFm5X9EnJw5EIE3zg8BsSrJ3WRx1I6BgtUecnVbBg?e=OYrvjc) (Excel)\
If you are unable to access/edit either of these, and feel you should be able to, you may [request access](mailto:np21862@bristol.ac.uk).
