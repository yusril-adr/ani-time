import { deleteList, getUser, updateUser } from "../db.js";

const loadSetting = () => {
    const nameElem = document.querySelector("#name");
    const emailElem = document.querySelector("#email");

    // Update placeholder
    const updatePlaceholder = () => {
        getUser()
        .then( user => {
            nameElem.setAttribute("placeholder", user.name);
            emailElem.setAttribute("placeholder", user.email);
        });
    };

    updatePlaceholder();
    

    // Delete button
    document.querySelector("#delete-btn").addEventListener("click", () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "All your saved list will be deleted, you won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                deleteList();
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
          });
    });

    // Reset button
    document.querySelector("#reset-btn").addEventListener("click", () => {
        nameElem.value = "";
        emailElem.value = "";
        M.updateTextFields();
    });

    // Save button
    document.querySelector("#save-btn").addEventListener("click", () => {
        getUser()
        .then( user => {
            if ( nameElem.value === "" && emailElem.value !== "" && !emailElem.className.includes("invalid") ) {
                user.email = email.value;
                updateUser(user);
                updatePlaceholder();
                M.toast({ html: 'Saved.' });
            } else if ( emailElem.value === "" && nameElem.value !== "") {
                user.name = nameElem.value;
                updateUser(user);
                updatePlaceholder();
                M.toast({ html: 'Saved.' });
            } else if ( nameElem.value !== "" && emailElem.value !== "" && !emailElem.className.includes("invalid") > -1 ) {
                user.name = nameElem.value;
                user.email = email.value;
                updateUser(user);
                updatePlaceholder();
                M.toast({ html: 'Saved.' });
            }
        });
    });
}

export default loadSetting;