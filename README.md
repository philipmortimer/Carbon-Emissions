# Project Context
This project was undertaken by myself and four others over 6 months. We produced a website (frontend + backend) that allows companies to enter their travel data and understand what actions they can choose to take to reduce their carbon emissions. We used a range of external project management tools like a Kanban board to ensure the project functioned correctly (unfortunately, this is not visible on this cloned version of the repository). Please note that the website may not work as the domain is due to expire soon and as this version does not contain the API key used to make the project work. I received a first class grade for this project. Here are some screenshots and videos of the functioning site:

![Site Homepage](https://github.com/philipmortimer/Carbon-Emissions/assets/64362945/5a2a2f9c-8f63-452e-8113-60ea06f44687)

![Main Screen](https://github.com/philipmortimer/Carbon-Emissions/assets/64362945/effe8112-4c62-445c-9304-26ec3f8339cf)

https://github.com/philipmortimer/Carbon-Emissions/assets/64362945/6fc37eae-d133-4ee6-9620-0ce5396dc5bc

Please view the project readme below:

<p align="center">
  <img src="https://enterprise.routezero.world/static/media/routezero.e760ac773e0cf56e3c20e228ee964ebb.svg" alt="rze_logo" width="400px"/>
</p>

# Route Zero Enterprise Carbon Savings Prediction

Visit our Continuously Delivered (on merge with main) deployment at [http://rzcarbonsavings.ddns.net/](http://rzcarbonsavings.ddns.net/) or [http://34.226.134.137](http://34.226.134.137).

## Index
- [Route Zero Enterprise Carbon Savings Prediction](#route-zero-enterprise-carbon-savings-prediction)
  - [Index](#index)
  - [Overview](#overview)
    - [Repository Structure](#repository-structure)
  - [Requirements](#requirements)
  - [Startup guides](#startup-guides)
    - [Starting our Frontend](#starting-our-frontend)
    - [Installing dependancies (prerequisite)](#installing-dependancies-prerequisite)
    - [Available Scripts](#available-scripts)
      - [`npm start`](#npm-start)
      - [`npm test`](#npm-test)
      - [`npm run build`](#npm-run-build)
    - [Deployment](#deployment)
  - [Starting our Backend](#starting-our-backend)
    - [Getting the server running](#getting-the-server-running)
    - [Terminal](#terminal)
    - [IntelliJ (Alternative)](#intellij-alternative)
  - [Docker Images](#docker-images)
    - [For the Frontend](#for-the-frontend)
    - [For the Backend](#for-the-backend)
    - [For the whole app](#for-the-whole-app)
  - [GHCR](#ghcr)
  - [Concepts and planning](#concepts-and-planning)
    - [Early design diagrams](#early-design-diagrams)
    - [Early design sketches](#early-design-sketches)
  - [User Journeys](#user-journeys)
  - [User Stories of RouteZero](#user-stories-of-routezero)
  - [Ethics](#ethics)
  - [License](#license)
  - [Documentation](#documentation)
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
.
├── backend
│   ├── server
│   │   ├── compose_backend.yaml
│   │   ├── Dockerfile
│   │   ├── Javadocs
│   │   ├── mvnw
│   │   ├── mvnw.cmd
│   │   ├── pom.xml
│   │   ├── src
│   │   └── target
│   └── server.iml
├── Dockerfile
├── docs
│   ├── backend tests plan.xlsx
│   ├── ETHICS.md
│   ├── PULL_REQUEST_TEMPLATE
│   │   └── pull_request_template.md
│   └── stakeholders-and-user-stories.txt
├── frontend
│   ├── package-lock.json
│   └── route-zero-enterprise
│       ├── compose.yaml
│       ├── Dockerfile
│       ├── example_data
│       ├── node_modules
│       ├── out
│       ├── package.json
│       ├── package-lock.json
│       ├── public
│       └── src
├── LICENSE.md
├── pull_and_run
├── push_to_ghcr
├── README.md
└── start

```
## Requirements
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/en/)
- [Maven v3.8.6](https://maven.apache.org/docs/3.8.6/release-notes.html)

## Startup guides

### Starting our Frontend

### Installing dependancies (prerequisite)

Before you can run any of the below, please run ``npm install`` in **./frontend/route-zero-enterprise**.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Testing feature to-be implemented. 

#### `npm run build`

Builds the app for production to the `build` folder.\

### Deployment

The frontend is running with NGINX. To deploy the app yourself, please see [Docker Images](#docker-images).

## Starting our Backend

### Getting the server running
Before booting up the server, make sure to include the api key in the api_key.json file in ``/resources``.

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
- find the root of the project
- select a name for the image, here ``<docker_username>/fullstack:latest`` is used
- run ``docker build --tag <docker_username>/fullstack:latest . && docker run -p 3000:3000 -p 8080:8080 <docker_username>/fullstack:latest``

Visit ``localhost:3000`` to use the full app.

## GHCR

Pull our docker image from this repository's container reposotiory:
- ``docker pull ghcr.io/spe-uob/2022-route_zero_carbon_savings:latest``

Run our docker image as a container:
- ``docker run -p 3000:3000 -p 8080:8080 2022-route_zero_carbon_savings:latest``

## Concepts and planning
### Early design diagrams

<img width="762" alt="Screenshot 2023-04-29 at 14 50 18" src="https://user-images.githubusercontent.com/98458590/235306423-14698edd-d2f2-42df-a7aa-5a3379c55d7e.png">

### Early design sketches

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


## Ethics
No data is being collected as part of this project
[See more...](/docs/ETHICS.md)

## License
This project uses the MIT License. Please refer to the link below for more information.
[See more...](/LICENSE.md)

## Documentation

### Backend

Find the javadocs here -> ``backend/server/Javadocs/index.html``

### Frontend 

Find the JSDocs here -> ``frontend/route-zero-enterprise/out/index.html``

#### Viewing  

Open ``frontend/route-zero-enterprise/out/index.html`` in your browser to view documentation, having cloned the repository.

#### Updating

Please run this at the top-level of our repository when you made additions to the documentation \
``jsdoc -r ./frontend/route-zero-enterprise/src -d ./frontend/route-zero-enterprise/out ``

#### **NB** this requires you to install jsdocs with npm, please refer to https://jsdoc.app/ for these instructions 

## Group notes and Gantt chart
[View our group notes](https://succinct-structure-02b.notion.site/SPE-group-notes-1d5c154901614994adeb4df74cc76579) (Notion) \
[View our Gantt chart](https://uob-my.sharepoint.com/:x:/g/personal/ai20192_bristol_ac_uk/EQ2tWVFm5X9EnJw5EIE3zg8BsSrJ3WRx1I6BgtUecnVbBg?e=OYrvjc) (Excel)\
If you are unable to access/edit either of these, and feel you should be able to, you may [request access](mailto:np21862@bristol.ac.uk).
