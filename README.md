# Virtusize Assignment

This Virtusize Assignment is made with the following:

* [React] - A Javascript library made by facebook, for developing user interfaces
* [Twitter Bootstrap] - Front-end component library used for rapid prototyping
* [jQuery] - Required for Bootstrap js features. Only used for Bootstrap Modal in this project
* [Webpack] - Webpack is an open-source JavaScript module bundler. Used for rapid development and bundling for production
* [Nodejs] - Required if you want to host production build, locally.

## Design Considerations
When approaching this project, I have set out with the following objectives and goals:
- Seamless experience - No transition between screens, when user wants to complete an action. E.g. Changing password
- Aim to make UI intuitive to understand. Shouldn't reinvent the wheel (redesign everything), since users will prefer a familar interface. Using white space to declutter the UI, making it easier for users to focus on task/objective
- Maintainable - Easy for other developers to understand and maintain

## Instructions
### Installation
```sh
$ git clone https://github.com/jomaint/virtusize-profile
$ cd virtusize-profile
$ npm install
```
### Development

For developing locally

```sh
$ npm install
$ npm start
```

### Production build

To build for production on bare servers (EC2, DO droplets, etc)
After commiting to develop branch, merge into master then build

```sh
$ npm run build
$ git add . && git commit --m "Production build" && git push
```

SSH into remote server. Also assuming Nginx or other web service is serving the bundle files & html
```sh
$ cd project_folder_path
$ git checkout master
$ git pull && npm run live
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
   [Nodejs]: <https://nodejs.org/en/>
