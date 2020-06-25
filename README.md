# DEVents

### [Digital Career Institute DCI](https://digitalcareerinstitute.org/) Final Project

![Alt Text](https://media.giphy.com/media/jnJiEb7IkKo51Inivr/giphy.gif)

DEVents is a **totally functional and responsive web app** created by and for web developers, who are **continuously looking for challenges** as well as new ways to expand their knowledge. In DEVents you can find all happenings regarding web development (meetups, workshops or conventions) and also sign up and create your own meetups, projects or study groups.

You won’t need to visit several websites to **be aware of the latest web development events**. You’ll just need to enter DEVents.

## Demo

### [Follow this link to be redirected to DEVents](http://localhost:3000)

![Demo landing](https://media.giphy.com/media/ME4o4U9WAqdkjFBgRf/giphy.gif)

![Demo events](https://media.giphy.com/media/XcGusF9DeKctV09toj/giphy.gif)

![Demo mobile phone](https://media.giphy.com/media/ieVt945xyjfZn8zhgW/giphy.gif)


## Technologies used

DEVents was developed with **MERN-Stack technologies**:

### Frontend

We created this web app with React.js and for the style we used Sass with pure CSS.

<div float="left">
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077333/devents/640px-React-icon.svg.png" width="auto" height="100" alt="reactjs" />
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077333/devents/download.png" width="auto" height="100" alt="sass"/>

We also used external APIs and libraries to implement or project, like Google Maps or Moments.

<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077333/devents/google-maps-redesign.png" width="auto" height="100" alt="google maps"/>
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077334/devents/momentjs-logo-png-transparent.png" width="auto" height="100" alt="moments"/>
</div>

### Backend

On the backend, we used **Node.js**. We structured our server with **Express.js**. The made use of **mongoose** to store all the data in our **MongoDB** database and used other packages to develop some features:

> Moment.js

We used it to manipulate dates. Working with different APIs brings a lot of inconsistency in the date formats. Moment allowed us to display dates in the desired format.

> Node Mailer
    
Nodemailer is a module for Node.js  that we used in our contact form for email sending.

> Multer

Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. In our app we the user can create events and upload their own images to our database.

> GridFS

GridFS is the MongoDB specification for storing and retrieving large files such as images, audio files, video files, etc. It is kind of a file system to store files but its data is stored within MongoDB collections.

> Bcrypt

 Bcrypt is a password hashing function and we implemented to keep the user password protected.

<div display="flex">
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077334/devents/1280px-Node.js_logo.svg.png" width="auto" height="100" alt="nodejs" />
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077333/devents/1_Jr3NFSKTfQWRUyjblBSKeg.png" width="auto" height="100" alt="node express"/>
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077333/devents/ff287000-30dc-11ea-92f3-ac90e90eb823.png" width="auto" height="100" alt="node fetch"/>
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077333/devents/nm_logo_200x136.png" width="auto" height="100" alt="nodemailer"/>
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077332/devents/unnamed.png" width="auto" height="100" alt="multer"/>
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077333/devents/bcrypt-logo.jpg" width="auto" height="100" alt="bcrypt"/>
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077333/devents/2a2626069a7f9b14279ee90de6ae5538.jpg" width="auto" height="100" alt="web scraping"/>
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077333/devents/gridfs.png" width="auto" height="100" alt="mongodb"/>
</div>

### Workflow

Our workflow was based on the **agile method** with daily meetings regarding backlog and to do tasks, Kanban workflow and weekly sprints with accurate goals.

<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077335/devents/agile.png" width="auto" height="150" alt="agile method"/>

Since the beginning we have been storing our progress in a project in github and we have been using git to make any change in the repository.

<div float="left">
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077334/devents/b72132a9b5c6dd6faae9b28d85a822fb.png" width="auto" height="100" alt="github"/>
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077334/devents/git-logo.png" width="auto" height="100" alt="git"/>
</div>

As this project has been developed during the COVID-19 crisis, all the daily meetings have been taken online through apps like Google Meet and Zoom. We also used platforms like Slack and Trello to keep the communication fluent and work following the tasks posted in the list-making application.

<div float="left">
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077334/devents/Zoom-App-Icon-2.png" width="auto" height="100" alt="zoom"/>
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077335/devents/1280px-Google_Meet_text_logo_dark.svg.png" width="auto" height="100" alt="google meet"/>
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077335/devents/trello-logo-blue.png" width="auto" height="100" alt="trello"/>
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077335/devents/1200px-Slack_Logo_2019.svg.png" width="auto" height="100" alt="slack"/>
</div>

### Design

Before we started coding, we created some user stories to understand the experience we wanted to give to the users. After that we started a brainstorming to design the website.

We used Figma for the first sketches, where we just avoided to talk about colours or animations but started talking about features we wanted: like a carousel displaying some events, an information site to guide a non registered user to log in, how to display all the events we were going to fetch.

![figma](https://res.cloudinary.com/jimbocloud/image/upload/v1593080817/devents/Screenshot_from_2020-06-25_12-26-24.png)

After having a representation of the client side of our project, it was time to inform the backend about the routes the frontend was going to need, so we designed a tree of endpoints.

![endpoints](https://res.cloudinary.com/jimbocloud/image/upload/v1593080651/devents/endpoints.png)

When we started developing the components, we tried with the red colour but after the first results we decided to change to blue. Also we decided to design a minimalist website that offers an easy adventure to the user.

<div float="left">
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077334/devents/Canva_Logo.png" width="auto" height="100" alt="canva"/>
<img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593077334/devents/figma-1-logo.png" width="auto" height="100" alt="figma"/>
</div>


## Problems faced

### Social Challenges

* Accomplishing fast workflow and efficient communication using a video-conference application.

* Improving the team’s research and problem-solving skills

* Forming one idea agreed by all

### Tech Challenges

* Working as a team in the same Github repository

* Obtaining info from other websites due to lack of APIs

* Using the Google Maps API

* Uploading external images to our database

* Filtering the events

### Future Implementations

* Login/Sign up with the github account

* Add space for comments in each event

* Add share options for social networks

## DEVents Team

>### Nadia Daruiz
<a href="https://github.com/NadiaDaruiz"><img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593081223/devents/Octicons-mark-github.svg" width="auto" height="50" alt="github account"/></a>
<a href="https://www.linkedin.com/in/nadiadaruiz/"><img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593081222/devents/600px-LinkedIn_logo_initials.webp" width="auto" height="50" alt="linkedin account"/></a>

>### Federico Ientile
<a href="https://github.com/peteco83"><img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593081223/devents/Octicons-mark-github.svg" width="auto" height="50" alt="github account"/></a>
<a href="https://www.linkedin.com/in/federico-ientile-6094977a/"><img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593081222/devents/600px-LinkedIn_logo_initials.webp" width="auto" height="50" alt="linkedin account"/></a>

>### Jaime Segura
<a href="https://github.com/jseguraweb"><img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593081223/devents/Octicons-mark-github.svg" width="auto" height="50" alt="github account"/></a>
<a href="https://www.linkedin.com/in/jaime-segura/"><img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593081222/devents/600px-LinkedIn_logo_initials.webp" width="auto" height="50" alt="linkedin account"/></a>
<a href="https://www.jaimeseguraweb.com/"><img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593081251/devents/domain.png" width="auto" height="50" alt="website"/></a>

>### Dana Shacham
<a href="https://github.com/dshacham"><img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593081223/devents/Octicons-mark-github.svg" width="auto" height="50" alt="github account"/></a>
<a href="https://www.linkedin.com/in/dana-shacham-937408163/"><img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593081222/devents/600px-LinkedIn_logo_initials.webp" width="auto" height="50" alt="linkedin account"/></a>

>### Marlon Torriente
<a href="https://github.com/marlon-codes"><img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593081223/devents/Octicons-mark-github.svg" width="auto" height="50" alt="github account"/></a>
<a href="https://www.linkedin.com/in/marlon-torriente-webdev/"><img src="https://res.cloudinary.com/jimbocloud/image/upload/v1593081222/devents/600px-LinkedIn_logo_initials.webp" width="auto" height="50" alt="linkedin account"/></a>