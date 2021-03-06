var Nanocomponent = require('nanocomponent')
var reactDom = require('react-dom')
var react = require('react')
var html = require('bel')
var toReact = require('./react')

// create new nanocomponent
function Button () {
  if (!(this instanceof Button)) return new Button()
  this.color = null

  Nanocomponent.call(this)
}
Button.prototype = Object.create(Nanocomponent.prototype)

Button.prototype.handleClick = function () {
  console.log('yay')
}

Button.prototype.createElement = function ({color}) {
  this.color = color
  return html`
    <button onclick=${this.handleClick} style="background-color: ${color}">
      Click Me
    </button>
  `
}

// Implement conditional rendering
Button.prototype.update = function ({newColor}) {
  return newColor !== this.color
}

var ReactButton = toReact(Button, react)
var el = document.createElement('div')
document.body.appendChild(el)
reactDom.render(react.createElement(ReactButton, { color: 'green' }), el)
