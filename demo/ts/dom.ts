// This script is called with the defer attribute, meaning that it can be assumed the DOM is loaded by the time this script is being run

const form: HTMLFormElement = document.querySelector('form#demoForm')
form.onsubmit = onFormSubmit

function onFormSubmit(evt: Event) {
  evt.preventDefault()
  console.log(evt)
}
