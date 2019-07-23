# Virtusize Assignment

This Virtusize Assignment is made with the following:

* [React] - A Javascript library made by facebook, for developing user interfaces
* [Twitter Bootstrap] - Front-end component library used for rapid prototyping
* [jQuery] - Required for Bootstrap js features. Only used for Bootstrap Modal in this project
* [Webpack] - Webpack is an open-source JavaScript module bundler. Used for rapid development and bundling for production

## Design Considerations
When approaching this project, I have set out with the following objectives and goals:
- Seamless experience - No transition between screens, when user wants to complete an action. E.g. Changing password
- Aim to make UI easy & intuitive. Shouldn't reinvent the wheel (redesign everything), since users will prefer a familar interface. Using white space to declutter the UI, making it easier for users to focus on task/objective

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
$ npm install --production
$ NODE_ENV=production node app
```

### Production build

For production environments...

```sh
$ npm install --production
$ NODE_ENV=production node app
```


### Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ node app
```

Second Tab:
```sh
$ gulp watch
```

(optional) Third:
```sh
$ karma test
```
### Building for source
For production release:
```sh
$ gulp build --prod
```
Generating pre-built zip archives for distribution:
```sh
$ gulp build dist --prod
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:8000
```


### Plugins

Dillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Dropbox | [plugins/dropbox/README.md][PlDb] |
| Github | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| OneDrive | [plugins/onedrive/README.md][PlOd] |
| Medium | [plugins/medium/README.md][PlMe] |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [webpack]: <https://webpack.js.org/>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [express]: <http://expressjs.com>
   [React]: <https://reactjs.org/>
