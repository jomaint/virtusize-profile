# Virtusize Assignment

This Virtusize Assignment is made with the following:

* [React] - A Javascript library made by facebook, for developing user interfaces
* [Twitter Bootstrap] - Front-end component library used for rapid prototyping
* [jQuery] - Required for Bootstrap js features. Only used for Bootstrap Modal in this project
* [Webpack] - Webpack is an open-source JavaScript module bundler. Used for rapid development and bundling for production
* [Sass] - Sass is a CSS pre-processor

## Demo
[Demo](https://wizardly-dijkstra-050732.netlify.com/)

## Environment Support
Tested for:
- Chrome (Latest 2 version)
- Safari (Latest 2 version)
- Firefox (Latest 2 version)

## Design Considerations
When approaching this project, I have set out with the following objectives and goals:
- Seamless experience - No transition between screens, when user wants to complete an action. E.g. Changing password
- Aim to make UI intuitive to understand. Shouldn't reinvent the wheel (redesign everything), since users will prefer a familiar interface. Using white space to declutter the UI, making it easier for users to focus on task/objective
- Maintainable - Easy for other developers to understand and maintain

## Setting up
### Development

For developing locally. Features for developing locally, includes hot reloading, sass compiling without restarting webpack, bundles are stored in RAM and served with webpack-dev-server

```sh
$ git clone https://github.com/jomaint/virtusize-profile
$ cd virtusize-profile
$ npm install
$ npm start
```

### Production build

To build for production on bare servers (EC2, DO droplets, etc)
After commiting to changes to develop branch

1. Merge develop into master
```sh
$ git checkout master
$ git merge developer
```
2. Build files into bundle.css & bundles.js for production. Which also allow us to use ES6 syntax for development while keeping it compatible with more browsers
```sh
$ npm run build
$ git add .
$ git commit --m "Production build"
$ git push
```

3. SSH into remote server.
Also assuming Nginx or other web service is serving the bundle files & html. In our Demo, we used netlify to automatically build when we push to github
```sh
$ cd project_folder_path
$ git checkout master
$ git pull && npm run deploy
```

#### Testing production build locally
After the above steps, skipping step 3. you can run the local nodejs (v8.9.0) server to serve the static files just to check. Useful, to check before pushing to master, especially if you have CI like in netlify.
```sh
$ node server
```

## Extras:
- Able to preview image after uploading, bypassing uploading. Able to show how image will look like.
- Build minified files for production. Test production files locally using nodejs, express
- Additional details on accessibility such as, handling 'Enter' button when editing fields


   [webpack]: <https://webpack.js.org/>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [express]: <http://expressjs.com>
   [React]: <https://reactjs.org/>
