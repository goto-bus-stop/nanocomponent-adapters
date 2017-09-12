module.exports = function customElement (Component, observedAttributes, parent) {
  if (!Array.isArray(observedAttributes) && typeof observedAttributes === 'function') {
    parent = observedAttributes
    observedAttributes = null
  }

  parent = parent || window.HTMLElement

  // using class syntax is required for custom elements.
  // `HTMLElement` can't be `.call`ed inside the constructor with function+prototypes.
  class Element extends parent {
    constructor () {
      super()
      this.state = {}
      this.component = new Component()
    }

    connectedCallback () {
      var attributes = this.attributes
      this.state = {}
      for (var i = 0; i < attributes.length; i++) {
        var attr = attributes[i]
        this.state[attr.name] = attr.value
      }

      var element = this.component.render(this.state)
      this.appendChild(element)
    }

    attributeChangedCallback (name, oldValue, newValue) {
      this.state[name] = newValue
      this.component.render(this.state)
    }
  }

  Object.defineProperty(Element, 'observedAttributes', {
    get: function () {
      return observedAttributes || []
    }
  })

  return Element
}
