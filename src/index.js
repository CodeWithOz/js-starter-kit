import './index.css';

import { getUsers, deleteUser } from "./api/userApi";

// Populate a table of users via API call
getUsers().then(result => {
  let usersBody = "";

  result.forEach(user => {
    usersBody += `<tr>
        <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
      </tr>`;
  });

  global.document.getElementById('users').innerHTML = usersBody;

  const deleteLinks = [...global.document.getElementsByClassName('deleteUser')];
  deleteLinks.forEach(link => {
    link.onclick = event => {
      const element = event.target;
      event.preventDefault();

      // delete user from db
      deleteUser(element.attributes['data-id'].value);

      // delete user from DOM
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });
});
