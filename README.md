![HomePage](https://user-images.githubusercontent.com/93931081/218331108-c3425d5f-dfa4-45a7-9fd0-246c21a776ce.jpg)



<h3 align="center">Quiz Pop - Quiz Application</h3>

<p align="center">This is the KnowledgeHut/Upgrade Hackthon challenge (HTML, CSS3, Javascript). This repository contains a quiz web application built using HTML, CSS, and JavaScript. This website is designed for trivia games with a start area, a question area, and a results area where you can play exciting trivia questions on the topics provided.</p>

## 📝 Table of Contents

- [Problem Statement](#problem_statement)
- [Solution summary](#solution)
- [Usage](#usage)
- [Getting Started](#getting_started)
- [Built Using](#built_using)
- [Authors](#authors)

## 💬 Problem Statement <a name="problem_statement"></a>

The challenge is to build a quiz application named Quiz Pop which enables users to pick a topic and complete a 10-question quiz. Once the quiz is completed, the score should be displayed.

## 🧐 Solution summary <a name="solution"></a>

The main goal of this exercise is to create a quiz app that picks up topics from a given dataset and displays them in the home/welcome panel. So I used the loop concept to create a list of topics.

Then I needed to display question after question on a selected topic, so I applied the Javascript class concept to create an instance after clicking on a topic and inherit all its properties and methods.

This class contains record-like properties about related questions, subjects, scores, correct and incorrect answers, list of questions attempted, etc., and a Contains methods such as showQuestion, nextQuestion, previousQuestion, and CheckAnswers that handle the entire mechanics of questions and option provided to it.

For this project, it was important to use local storage to store the results and ensure they were available even after refreshing the results page

## 🎈 Usage or Demo <a name="usage"></a>

Please watch the following demo video for usage of the website:

Please click on below link to see live website:
[Live Website](https://profound-sherbet-493891.netlify.app/)

OR 

Watch Demo Video

https://user-images.githubusercontent.com/93931081/218331168-64f5a0fe-3c66-4a37-ad3f-3f02ecbd4105.mp4


## 🏁 Getting Started <a name = "getting_started"></a>

### Installing

1. Clone the repo:

```
  git clone https://github.com/AbhayKadam57/QuizPop_Quiz_app.git
```

2. Install the project's packages with the following commands:

```
npm install
```

3. Finally, to run the project, use the following command:

```
npm run dev
```

## ⛏️ Built Using <a name = "built_using"></a>

 <img width="200" height=90 src="https://global.discourse-cdn.com/sitepoint/original/3X/b/5/b59a78e2ed76c705f3c0dcb300f3f222aefdcd99.png"/>

## ✍️ Authors <a name = "authors"></a>

- [@AbhayKadam57](https://github.com/AbhayKadam57) - Idea & Initial work

- Contact Me - [kadamabhay40@gmail.com](kadamabhay40@gmail.com)

<hr/>

## **KnowledgeHut upGrad | JavaScript Starter Template 2.0**

This is the new version of the create-js-app that incorporates the Vite development tool instead of the Parcel bundler as used in v1.0 of this utility. Vite (https://vitejs.dev) brings tremendous performance boost to the development environment.

A sample application has been made available in the src folder which you can edit as needed.

- `src/index.html` : This is the root HTML document
- `src/js/index.js`: This is the main JavaScript file which is imported into the HTML document. You can directly start building the application here. When you open this file, you will see some code present already. More on this below.
- `src/css/style.css`: This is the main stylesheet. Feel free to edit its contents.
- `src/api`: This folder contains scripts that provide a simulated backend that you can use in development, if needed. This is powered by Mock Service Worker (https://mswjs.io). If you're building data/remote API based apps, you can use this utility to simulate an API without actually building one during development.

  - `src/api/browser.js`: Please do not edit this file. It enables the use of Mock Service Worker.
  - `src/api/routes.js`: This file may be edited to incorporate custom API routes for Mock Server Worker. By default, a root route (/) that returns a text message as a JSON object is present. You can learn more about MSW and how to define your own custom API routes for development by visiting https://mswjs.io/docs/

- `src/public`: This folder contains the MSW utility file (mockServiceWorker.js) which should not be edited/removed. Any files you place in this folder can be directly accessed in your HTML document. Use this for placing static assets such as images.

**Instructions**

- **Development** : Run `npm run dev` - This will start the development server and open the app in the default browser. You can then work with the files in the src/ folder and can see instant updates in the browser.
- **Production Build**: Run `npm run build` - This will produce a build edition that you can then deploy on the cloud/host on a static file service such as GitHub pages or surge.sh. We recommend trying https://surge.sh for deploying static apps. Please note that the build also copies down the mockServiceWorker.js file into the dist folder. You can safely remove this file from the dist folder before deploying your app.
