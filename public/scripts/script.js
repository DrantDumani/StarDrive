const toggleBtn = document.querySelector("#new-folder-btn");

const toggleModal = (elem) => {
  elem.classList.toggle("hide-modal");
  elem.classList.toggle("modal-wrapper");
};

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const folderForm = document.querySelector("#folder-form");
    toggleModal(folderForm);
  });
}

const closeModalBtn = document.querySelector("#close-modal");
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    const folderForm = document.querySelector("#folder-form");
    toggleModal(folderForm);
  });
}

const toggleBtnFile = document.querySelector("#new-file-btn");
if (toggleBtnFile) {
  toggleBtnFile.addEventListener("click", () => {
    const fileForm = document.querySelector("#file-form");
    toggleModal(fileForm);
  });
}

const closeFileModalBtn = document.querySelector("#close-file-modal");
if (closeFileModalBtn) {
  closeFileModalBtn.addEventListener("click", () => {
    const fileForm = document.querySelector("#file-form");
    toggleModal(fileForm);
  });
}

const editFolderBtn = document.querySelector("#edit-btn");
if (editFolderBtn) {
  editFolderBtn.addEventListener("click", () => {
    const editForm = document.querySelector("#edit-form");
    toggleModal(editForm);
  });
}

const closeEditModalBtn = document.querySelector("#close-edit-modal");
if (closeEditModalBtn) {
  closeEditModalBtn.addEventListener("click", () => {
    const editForm = document.querySelector("#edit-form");
    toggleModal(editForm);
  });
}

const shareBtn = document.querySelector("#share-btn");
if (shareBtn) {
  shareBtn.addEventListener("click", () => {
    const shareForm = document.querySelector("#share-form");
    toggleModal(shareForm);
  });
}

const closeShareModalBtn = document.querySelector("#close-share-modal");
if (closeShareModalBtn) {
  closeShareModalBtn.addEventListener("click", () => {
    const shareForm = document.querySelector("#share-form");
    toggleModal(shareForm);
  });
}
