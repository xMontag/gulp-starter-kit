'use strict'
const apiURL = "https://test-users-api.herokuapp.com/users/";
const result = document.querySelector(".result");
const btnShowAll = document.querySelector(".form__btn_show-all");
const btnGetUser = document.querySelector(".form__btn_get-user");
const btnAddUser = document.querySelector(".form__btn_add-user");
const btnRemoveUser = document.querySelector(".form__btn_remove-user");
const btnUpdateUser = document.querySelector(".form__btn_update-user");
const btnClearResult = document.querySelector(".form__btn_clear-result");
const inputUserID = document.querySelector(".form__input_user-id");
const inputUserName = document.querySelector(".form__input_user-name");
const inputUserAge = document.querySelector(".form__input_user-age");

btnShowAll.addEventListener("click", btnShowAll_onclick);
btnGetUser.addEventListener("click", btnGetUser_onclick);
btnAddUser.addEventListener("click", btnAddUser_onclick);
btnRemoveUser.addEventListener("click", btnRemoveUser_onclick);
btnUpdateUser.addEventListener("click", btnUpdateUser_onclick);
btnClearResult.addEventListener("click", btnClearResult_onclick);


function btnClearResult_onclick(event) {
  result.textContent = "";
}

function btnShowAll_onclick(event) {
  const promise = getAllUsers();
  print('>show all');
  promise
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    })
    .then(data => {
      //console.log(data);
      printArr(data.data.map(el => userToString(el)));
      result.scrollTop = result.scrollHeight;
    })
    .catch(err => {
      print(err);
      console.error("Error: ", err);
    });
};

function btnGetUser_onclick(event) {
  const id = inputUserID.value;
  if (id) {
    print(`>get user ${id}`);
    const promise = getUserById(id);
    promise
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    })
    .then(data => {
      if (data.status === 200) {
        print(userToString(data.data));
      } else {
        print('failed!');
      }
      //console.log(data);
      result.scrollTop = result.scrollHeight;
    })
    .catch(err => {
      print(err);
      console.error("Error: ", err);
    });
  }
};

function btnAddUser_onclick(event) {
  const id = inputUserID.value;
  const name = inputUserName.value;
  const age = inputUserAge.value;

  if (id && name && age) {
    print(`>add user name : ${name}, age : ${age}`);
    const promise = addUser(name, age);
    promise
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    })
    .then (data => {
      //console.log(data);
      if (data.status === 201) {
        print('added');
      } else {
        print('failed!');
      }
      result.scrollTop = result.scrollHeight;
    })
    .catch(err => {
      print(err);
      console.error("Error: ", err);
    });
  }
};

function btnRemoveUser_onclick(event) {
  const id = inputUserID.value;
  if (id) {
    print(`>remove user ${id}`);
    const promise = removeUser(id);
    promise
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    })
    .then (data => {
      //console.log(data);
      if (data.status === 200) {
        print('deleted');
      } else {
        print('failed!');
      }
      result.scrollTop = result.scrollHeight;
    })
    .catch(err => {
      print(err);
      console.error("Error: ", err);
    });
  }
};

function btnUpdateUser_onclick(event) {
  const id = inputUserID.value;
  const name = inputUserName.value;
  const age = inputUserAge.value;

  if (id && name && age) {
    print(`>update user id : ${id}, name : ${name}, age : ${age}`);
    const promise = updateUser(id, {name: name, age: age});
    promise
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    })
    .then (data => {
      //console.log(data);
      if (data.status === 200) {
        print('updated');
      } else {
        print('failed!');
      }
      result.scrollTop = result.scrollHeight;
    })
    .catch(err => {
      print(err);
      console.error("Error: ", err);
    });
  }
};

function print(res) {
  result.insertAdjacentHTML('beforeend', `<p>${res}</p>`);
}

function printArr(res) {
  let html = res.map(el => `<p>${el}</p>`).join('');
  result.insertAdjacentHTML('beforeend', html);
}

function userToString(user) {
  return `id : ${user.id}, name : ${user.name}, age : ${user.age}`;
};

function getAllUsers() {
  return fetch(apiURL);
};

function getUserById(id) {
  return fetch(apiURL + id);
};

function addUser(name, age) {
  const init = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name: name, age: age}),
    mode: 'cors',
    cashe: 'default'
  }
  return fetch(apiURL, init);
};

function removeUser(id) {
  const header = new Headers();
  const init = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cashe: 'default'
  }
  return fetch(apiURL + id, init);
};

function updateUser(id, user) {
  const header = new Headers();
  const init = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
    mode: 'cors',
    cashe: 'default'
  }
  return fetch(apiURL + id, init);
};