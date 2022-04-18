# PasuNashi

First of all, this is **NOT** a secure password manager, since key to decrypt everything on the database is stored as an environment variable on the backend server.

This is a personal project in which I put all my effort to learn a lot of technologies, some new, and some not so much, like React Hooks, Typescript, Redux and it's Hooks, and many more.

I always tried to follow the standards.

This is basically the same project as [Web-Forntend](https://github.com/PasuSewa/Web-Frontend), but with ElectronJS on top of that, and with a few less functionalities (the payment system, and the captcha, for example).

Whithout further ado, lets start with the documentation:

You can check out the docs generated with JsDocs on [this link](https://pasusewa.github.io/Web-Frontend/).

---

## How to initialize the project

First of all, you will need to properly set up the .env.local file. This projects include a .env.example file which shows what variables you need to fill up.

##### All the variables needed in the environment are the following:

1. REACT_APP_ENV_LOCAL: If there is nothing, the app will asume that the environment is "production", else, if there is anything, the app will change to "local" / "development" environment.
   <br/>
   <br/>
2. REACT_APP_USE_LOCAL_API: If empty, the app will call the production api, else, it will use http://localhost:8000/api (see src/hooks/useApi.ts to change the base uri for both options).
   <br/>
   <br/>
   Once you are done with all of that, the last thing is to run the following:

    `npm install`

    or

    `yarn install`

---

## Electron

**Before anything, to run these commands you must have yarn already installed in your PC or Mac.**

There are two commands that you wnat to know. The first one is how to run the project in the local environment:

`npm run electron:serve`

And the other useful-to-know command is:

`npm run electron:build`

Which is used to create the installer file for production.
(It will create the installer required for the system you are in at the time of building).

---

## Folder Structure

I don't know if this is a good practise or not, but I tried keep everything as simple as possible.

Basically, all the components that don't require a unit test, and don't use styles from Material-UI, are stored in their respective file, with the name of the component as the name of the file.

Then, the components that do have a test, and / or use the Material-UI styles, are stored in a folder with the name of the component, and with the test named as `componentName.test.tsx`, and styles as `styles.ts`.

And lastly, there are a few components that aren't used outside of their parent components, and those are stored inside of the folder of the parent component (for example the Drawer component, which is in src/components/Navbar/Drawer since it isn't used outside of the navbar).

---

## Running the Tests

In order to run the tests, you can execute the following:

`npm run test -a`

---

## Project Dependencies

[Material UI](https://material-ui.com/) - As the UI

[Fontawesome](https://fontawesome.com/) - For the icons

[Dexie](https://www.npmjs.com/package/dexie) - To handle all the interactions with Indexed DB (I don't recomment using it, its really simple to use, but very limited in my opinion).

[react-hook-form](https://www.npmjs.com/package/react-hook-form) - To handle all the forms

[react-qrcode-logo](https://www.npmjs.com/package/react-qrcode-logo) - For the QR codes

[react-redux](https://www.npmjs.com/package/react-redux) - To handle the global state

[JsDocs](https://www.npmjs.com/package/jsdocs) and [gh-pages](https://www.npmjs.com/package/gh-pages) - For the documenation

And lastly, this is not a dependency perse, but since I had a lot of problems using the package i18n, I decided to follow [this tutorial](https://www.youtube.com/watch?v=GtaKTDNQ6vo&list=PLXlNY59rhzeIlEiTIznuqji-ORgKjEhGa) to make the translation system.
