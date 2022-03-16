# Tutorial 5 - CSCI 5709

* *Date Created*: 05 03 2022
* *Last Modification Date*: 08 03 2022

## Author

* [Anuj Ashok Dev](mailto:an739753@dal.ca) - [B00900887]

## GitLab Individual Branch and Repository - Tutorial 5

* Tutorial 5 Branch: [https://git.cs.dal.ca/adev/anuj-dev-csci5709/-/tree/tutorial5](https://git.cs.dal.ca/adev/anuj-dev-csci5709/-/tree/tutorial5)

* Repository Link: [https://git.cs.dal.ca/adev/anuj-dev-csci5709](https://git.cs.dal.ca/adev/anuj-dev-csci5709)

## Deployed API Link - Tutorial 5

Deployed API: [https://anuj-dev-tutorial-5.herokuapp.com/](https://anuj-dev-tutorial-5.herokuapp.com/)

## GET call for list of users

Endpoint: [https://anuj-dev-tutorial-5.herokuapp.com/users](https://anuj-dev-tutorial-5.herokuapp.com/users)

## POST call to create a user

Endpoint: [https://anuj-dev-tutorial-5.herokuapp.com/add](https://anuj-dev-tutorial-5.herokuapp.com/add)

```
Body data - POST:

{
    "email":"dal@abc.ca",
    "firstName":"Dalhousie"
}
```

## PUT call to update a user

Endpoint: [https://anuj-dev-tutorial-5.herokuapp.com/update/:id](https://anuj-dev-tutorial-5.herokuapp.com/update/:id)

```
Body data - PUT:

{
    "email":"abcd@abc.ca",
    "firstName": "Dalhousie Uni"
}
```

## GET call for a specific user

Endpoint: [https://anuj-dev-tutorial-5.herokuapp.com/user/:id](https://anuj-dev-tutorial-5.herokuapp.com/user/:id)


## Built With

* [Node](https://nodejs.dev/) - The Back-End Framework Used
* [Heroku](https://id.heroku.com/login) - Used to Deploy React App
* [GitLab](https://git.cs.dal.ca/) - For version control
* [Visual Studio Code](https://code.visualstudio.com/download) - Code Editor

## Acknowledgments

* [How to Create a REST API Server using Node.js](https://morioh.com/p/d05c2e8a7325)
