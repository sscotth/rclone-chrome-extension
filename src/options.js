document.addEventListener('DOMContentLoaded', () => {
  restoreOptions()

  document.querySelector('form').addEventListener('submit', evt => {
    evt.preventDefault()
    saveOptions(collectOptions(evt.target))
  })
})

const collectOptions = form => ({
  password: form.elements.password.value,
  salt: form.elements.salt.value
})

const saveOptions = options => chrome.storage.sync.set(options)

const restoreOptions = () => chrome.storage.sync.get(['password', 'salt'],
  ({ password, salt }) => {
    document.querySelector('#password').parentNode.MaterialTextfield.change(password)
    document.querySelector('#salt').parentNode.MaterialTextfield.change(salt)
  }
)
