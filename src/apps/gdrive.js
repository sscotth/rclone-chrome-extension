/* global chrome, rclone */

chrome.storage.sync.get(['password', 'salt'], passwords => {
  const decryptor = rclone.Rclone(passwords).then(o => o.Path.decryptName)

  const decryptElement = (el) =>
    decryptor.then(decrypt => {
      el.innerText = decrypt(el.innerText)
      el.classList.add('rclone-decrypted')
    })

  const FILE_NAMES = 'span[data-is-doc-name="true"]:not(.rclone-decrypted)'
  const PARENT_FOLDERS = '[data-target="folder"]:not(.rclone-decrypted)'
  const CURRENT_FOLDER = '[guidedhelpid="folder_path_button"] > div > div:not(.rclone-decrypted)'

  const decryptAllFileAndFolderNames = () => document.querySelectorAll([FILE_NAMES, PARENT_FOLDERS, CURRENT_FOLDER].join(', ')).forEach(decryptElement)

  const btn = document.createElement('button')
  btn.classList.add('rclone-decrypt')
  btn.innerText = 'Rclone Decrypt'
  btn.addEventListener('click', decryptAllFileAndFolderNames)

  document.querySelector('[aria-label="New"]').insertAdjacentElement('afterend', btn)
})
