// modal logic goes here
// clicking on new folder or upload should respectively pull up modals for folder and file forms

// edit button has no modal. just pulls up form for editing folder.
// cancel button simply closes the modal. for edit form, it should make edit button show up again

// I'm not working on this any further. It's not worth the extra work
const toggleBtn = document.querySelector("#new-folder-btn");

const toggleModal = (elem) => {
  elem.classList.toggle("hide-modal");
  elem.classList.toggle("modal-wrapper");
};

toggleBtn.addEventListener("click", () => {
  const folderForm = document.querySelector("#folder-form");
  toggleModal(folderForm);
});

const closeModalBtn = document.querySelector("#close-modal");
closeModalBtn.addEventListener("click", () => {
  const folderForm = document.querySelector("#folder-form");
  toggleModal(folderForm);
});

const toggleBtnFile = document.querySelector("#new-file-btn");
toggleBtnFile.addEventListener("click", () => {
  const fileForm = document.querySelector("#file-form");
  toggleModal(fileForm);
});

const closeFileModalBtn = document.querySelector("#close-file-modal");
closeFileModalBtn.addEventListener("click", () => {
  const fileForm = document.querySelector("#file-form");
  toggleModal(fileForm);
});

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
