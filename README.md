# Hapi-Pattern-Library
A Pattern Library based on [Hapi.js](http://hapijs.com/)

This Pattern Library also acts as a task manager. When a change is made to a `Component`, `Pattern`, or `Template` the app scripts and styles will be recompiled and the browser updated.

## Getting started

You will need to have a recent version on `node` installed

If `node` is installed run the following commands to get started:

```
    $ npm install
    $ npm start
```

## Usage

__Pattern Library__

The pattern library consists of `Components`, `Templates`, and `Patterns`.

In order to add more of each simple follow the same structure as shown by the examples.

__Generators__

Firstly cd into project root.

 - Add new Component: `bash ./sh/component.sh <component-name>`
 - Add new Template: `bash ./sh/template.sh <template-name>`
 - Add new Pattern: `bash ./sh/pattern.sh <pattern-name>`

*NB*: Once a component is added you will need to manually include its scripts and styles.

 - Add component styles to: `./pattern-library/assets/styles/main.scss`
 - Add component scripts to: `./pattern-library/assets/scripts/main.js`


## Feature List

#### TODOS

 - Style frontend
 - Add export function
 - Add search functionality

#### Added

 - Display list of components
 - Compile and minify Pattern Library scripts/styles
 - Display app info in api
 - Re-render component on file change
 - Display Component's Markup, Context, Styles, Scripts, and Docs
 - Expose JSON Api
 - Seperate folder structure
 - Add watch functions
 - Implement React JS serverside rendering
 - Add generators for Components, Templates, and Patterns
