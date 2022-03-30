<!--- The following README.md sample file was adapted from https://dal.brightspace.com/d2l/le/content/203602/viewContent/2836201/View by Arvinder Singh for academic use --->

# Assignment 3

## Easy Housing - Group 11

Our group is creating a web application that will fulfill the need of students, working professionals, and other individuals 
looking for a new house to rent. Finding an affordable place to live in a new area can be hectic, especially for students.
The situation worsens by the lack of digital infrastructure. Our motive is to make this task more manageable for individuals.

Our web application will allow property owners to market their properties. The customers can search for these
properties and book appointments. They can cancel the booked appointment as well. The customers who have booked appointments
can post reviews and ratings about the property. The application also allows the users to search the services like meals,
laundry, and other necessities. Also, the person with room for one or more people can advertise for roommates.

**Assignment 3**

* *Date Created*: 24 Mar 2022
* *Last Modified Date*: 29 Mar 2022
* *Group Frontend Application URL*: https://easy-housing-web.herokuapp.com/
* *Group Backend URL*: https://easyhousingapi.herokuapp.com/api
* *Group Repo URL*: https://git.cs.dal.ca/adev/Group11_EasyHousing
* *Group Develop Branch URL*: https://git.cs.dal.ca/adev/Group11_EasyHousing/-/tree/develop
* *Group Individual Branch URL*: https://git.cs.dal.ca/adev/Group11_EasyHousing/-/tree/Arvinder-Singh-Develop

## Authors

* Arvinder Singh (ar345438@dal.ca) - *Maintainer*
* Anuj Ashok Dev (an739753@dal.ca) - *Maintainer - Group Member*
* Lins George (ln364865@dal.ca) - *Maintainer - Group Member*
* Purvilkumar Bharthania (pr420329@dal.ca) - *Maintainer - Group Member*
* Pankti Vyas (pn695271@dal.ca) - *Maintainer - Group Member*
* Viren Malavia (vr848745@dal.ca) - *Maintainer - Group Member*

## Feature:

**1. Ratings and Reviews**

This feature will provide the facility to provide Ratings and Reviews of the houses to the users. The user will be able to
provide ratings and reviews to the properties where they booked appointment. This will help the new customers to get an idea
about the property and shortlist the most suitable property.

Tasks:
* Add a rating
* Add a review

**2. Book Appointment**

This feature will help the user to book appointment. They can cancel the appointment as well. The users can visit, provide 
reviews and ratings only after booking appointment.

Tasks:
* Book Appointment
* Cancel Appointment

## Backend files created by me

- Folder - **/src/**
    - Folder - [/controllers](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/tree/develop/Backend/src/controllers)
        - [appointmentController.js](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/blob/develop/Backend/src/controllers/appointmentController.js) - This file contains the appointment related logic.
        - [ratingController.js](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/blob/develop/Backend/src/controllers/ratingController.js) - This file contains the ratings related logic.
        - [reviewController.js](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/blob/develop/Backend/src/controllers/reviewController.js) - This file contains the reviews related logic.
    - Folder - [/models](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/tree/develop/Backend/src/models)
        - [appointments.js](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/blob/develop/Backend/src/models/appointments.js) - This file contains the Appointments model.
        - [ratings.js](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/blob/develop/Backend/src/models/ratings.js) - This file contains the Ratings model.
        - [reviews.js](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/blob/develop/Backend/src/models/reviews.js) - This file contains the Reviews model.
    - Folder - [/routes](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/tree/develop/Backend/src/routes)
        - [appointmentRoute.js](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/blob/develop/Backend/src/routes/appointmentRoute.js) - This file contains the appointment related routes.
        - [ratingRoute.js](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/blob/develop/Backend/src/routes/ratingRoute.js) - This file contains the ratings related routes.
        - [reviewRoute.js](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/blob/develop/Backend/src/routes/reviewRoute.js) - This file contains the reviews related routes.

## Frontend files created by me

- Folder - **/src/pages**
  - Folder - [/Appointment](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/tree/develop/frontend/src/pages/Appointment)
    - Folder [/Appointment](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/tree/develop/frontend/src/pages/Appointment/Appointments)
      - [Appointments.js](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/blob/develop/frontend/src/pages/Appointment/Appointments/Appointments.js) - This file has the appointment page.
    - Folder - [/BookAppointment](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/tree/develop/frontend/src/pages/Appointment/BookAppointment)
      - [BookAppointment.js](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/blob/develop/frontend/src/pages/Appointment/BookAppointment/BookAppointment.js) - This file has the book appointment code.
    - Folder - [/CancelAppointment](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/tree/develop/frontend/src/pages/Appointment/CancelAppointment)
      - [CancelAppointment.js](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/blob/develop/frontend/src/pages/Appointment/CancelAppointment/CancelAppointment.js) - This file has the cancel appointment code.
  - Folder - [Rating](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/tree/develop/frontend/src/pages/Rating)
    - [Ratings.js](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/blob/develop/frontend/src/pages/Rating/Ratings.js) - This file has the ratings related code.
  - Folder - [Review](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/tree/develop/frontend/src/pages/Review)
    - [Review.js](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/blob/develop/frontend/src/pages/Review/Review.js) - This file has the reviews related code.
    - [ShowReviews.js](https://git.cs.dal.ca/adev/Group11_EasyHousing/-/blob/develop/frontend/src/pages/Review/ShowReviews.js) - This file has the code to display ratings and reviews.
    
## Getting Started

* Clone the code from https://git.cs.dal.ca/adev/Group11_EasyHousing.git to local directory.
* Open folder Group11_EasyHousing\Backend\
* Run **npm install** to install the dependencies and then **npm run** to run the backend application on local machine.
* In another window open folder Group11_EasyHousing\frontend\
* Run **npm install** to install the dependencies and then **npm run** to run the frontend application on local machine.

See the following sections for prerequisites, installation, etc.

## Tech Stack Used

* React - Frontend framework
* Node - JavaScript runtime engine
* Express - NodeJS web framework
* MySQL - Relational database

## Prerequisites

* NodeJS
* IDE
* Git

See the following section for detailed step-by-step instructions on how to install these softwares / libraries / plug-ins

## Installing

* Install nodejs after downloading it from https://nodejs.org/en/download/
* Install IDE by following the instructions given on https://www.jetbrains.com/help/webstorm/installation-guide.html
* Install git by following instructions given on link https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

## Deployment

* Deploy the application on heroku by following the instructions given on https://devcenter.heroku.com/articles/git
* Use the backend application link to interact with the APIs.
* Use the frontend application link to interact with the application. For example to check the deployed application please visit https://easy-housing-web.herokuapp.com/

## Build With

* https://nodejs.org/en/ - NodeJS
* https://www.jetbrains.com/webstorm/ - Webstorm IDE - Used to create application
* https://www.heroku.com/ - Heroku - Used to deploy the application
* https://git-scm.com/book/en/v2/Getting-Started-Installing-Git - Git - Used to push the application on GitLab and deploy the application on Heroku
* https://expressjs.com/ - Express
* https://www.npmjs.com/package/axios - axios
* https://www.npmjs.com/package/mysql2 - MySQL2
* https://www.npmjs.com/package/sequelize - Sequelize
* https://mui.com/getting-started/installation/ - Material UI (MUI)

## Sources Used

* https://nodejs.org/en/
* https://nodejs.org/en/download/
* https://www.heroku.com/
* https://www.jetbrains.com/webstorm/
* https://expressjs.com/
* https://expressjs.com/en/starter/installing.html
* https://www.jetbrains.com/help/webstorm/installation-guide.html
* https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
* https://devcenter.heroku.com/articles/git
* https://mui.com/
* https://mui.com/getting-started/installation/
* https://mui.com/components/rating/
* https://dal.brightspace.com/d2l/lms/dropbox/user/folders_history.d2l?db=140429&grpid=211878&isprv=0&bp=0&ou=203602
* https://dal.brightspace.com/d2l/lms/dropbox/user/folders_history.d2l?db=140428&grpid=211878&isprv=0&bp=0&ou=203602
* https://dal.brightspace.com/d2l/lms/dropbox/user/folders_history.d2l?db=140430&grpid=0&isprv=0&bp=0&ou=203602
* https://dal.brightspace.com/d2l/lms/dropbox/user/folders_history.d2l?db=140432&grpid=0&isprv=0&bp=0&ou=203602
* https://dal.brightspace.com/d2l/lms/dropbox/user/folders_history.d2l?db=140437&grpid=0&isprv=0&bp=0&ou=203602
* https://dal.brightspace.com/d2l/lms/dropbox/user/folders_history.d2l?db=140427&grpid=0&isprv=0&bp=0&ou=203602
* https://dal.brightspace.com/d2l/lms/dropbox/user/folders_history.d2l?db=140431&grpid=211878&isprv=0&bp=0&ou=203602
* https://dal.brightspace.com/d2l/lms/dropbox/user/folders_history.d2l?db=140434&grpid=0&isprv=0&bp=0&ou=203602


## Image Used

* https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg