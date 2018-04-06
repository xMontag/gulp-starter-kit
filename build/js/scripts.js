"use strict";

console.log(1);
'use strict';

var apiURL = "https://test-users-api.herokuapp.com/users/";
var result = document.querySelector(".result");
var btnShowAll = document.querySelector(".form__btn_show-all");
var btnGetUser = document.querySelector(".form__btn_get-user");
var btnAddUser = document.querySelector(".form__btn_add-user");
var btnRemoveUser = document.querySelector(".form__btn_remove-user");
var btnUpdateUser = document.querySelector(".form__btn_update-user");
var btnClearResult = document.querySelector(".form__btn_clear-result");
var inputUserID = document.querySelector(".form__input_user-id");
var inputUserName = document.querySelector(".form__input_user-name");
var inputUserAge = document.querySelector(".form__input_user-age");

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
  var promise = getAllUsers();
  print('>show all');
  promise.then(function (response) {
    if (response.ok) return response.json();
    throw new Error('Error fetching data');
  }).then(function (data) {
    //console.log(data);
    printArr(data.data.map(function (el) {
      return userToString(el);
    }));
    result.scrollTop = result.scrollHeight;
  }).catch(function (err) {
    print(err);
    console.error("Error: ", err);
  });
};

function btnGetUser_onclick(event) {
  var id = inputUserID.value;
  if (id) {
    print(">get user " + id);
    var promise = getUserById(id);
    promise.then(function (response) {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    }).then(function (data) {
      if (data.status === 200) {
        print(userToString(data.data));
      } else {
        print('failed!');
      }
      //console.log(data);
      result.scrollTop = result.scrollHeight;
    }).catch(function (err) {
      print(err);
      console.error("Error: ", err);
    });
  }
};

function btnAddUser_onclick(event) {
  var id = inputUserID.value;
  var name = inputUserName.value;
  var age = inputUserAge.value;

  if (id && name && age) {
    print(">add user name : " + name + ", age : " + age);
    var promise = addUser(name, age);
    promise.then(function (response) {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    }).then(function (data) {
      //console.log(data);
      if (data.status === 201) {
        print('added');
      } else {
        print('failed!');
      }
      result.scrollTop = result.scrollHeight;
    }).catch(function (err) {
      print(err);
      console.error("Error: ", err);
    });
  }
};

function btnRemoveUser_onclick(event) {
  var id = inputUserID.value;
  if (id) {
    print(">remove user " + id);
    var promise = removeUser(id);
    promise.then(function (response) {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    }).then(function (data) {
      //console.log(data);
      if (data.status === 200) {
        print('deleted');
      } else {
        print('failed!');
      }
      result.scrollTop = result.scrollHeight;
    }).catch(function (err) {
      print(err);
      console.error("Error: ", err);
    });
  }
};

function btnUpdateUser_onclick(event) {
  var id = inputUserID.value;
  var name = inputUserName.value;
  var age = inputUserAge.value;

  if (id && name && age) {
    print(">update user id : " + id + ", name : " + name + ", age : " + age);
    var promise = updateUser(id, { name: name, age: age });
    promise.then(function (response) {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    }).then(function (data) {
      //console.log(data);
      if (data.status === 200) {
        print('updated');
      } else {
        print('failed!');
      }
      result.scrollTop = result.scrollHeight;
    }).catch(function (err) {
      print(err);
      console.error("Error: ", err);
    });
  }
};

function print(res) {
  result.insertAdjacentHTML('beforeend', "<p>" + res + "</p>");
}

function printArr(res) {
  var html = res.map(function (el) {
    return "<p>" + el + "</p>";
  }).join('');
  result.insertAdjacentHTML('beforeend', html);
}

function userToString(user) {
  return "id : " + user.id + ", name : " + user.name + ", age : " + user.age;
};

function getAllUsers() {
  return fetch(apiURL);
};

function getUserById(id) {
  return fetch(apiURL + id);
};

function addUser(name, age) {
  var init = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name, age: age }),
    mode: 'cors',
    cashe: 'default'
  };
  return fetch(apiURL, init);
};

function removeUser(id) {
  var header = new Headers();
  var init = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    cashe: 'default'
  };
  return fetch(apiURL + id, init);
};

function updateUser(id, user) {
  var header = new Headers();
  var init = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
    mode: 'cors',
    cashe: 'default'
  };
  return fetch(apiURL + id, init);
};
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var alphabet = "qwertyuiop[]asdfghjkl;'zxcvbnm,./";

var keyboard = [alphabet.slice(0, alphabet.indexOf("a")), alphabet.slice(alphabet.indexOf("a"), alphabet.indexOf("z")), alphabet.slice(alphabet.indexOf("z"))];
//console.log(keyboard);

var indxStrArr = [[[1, 5], [0, 2], [1, 8], [1, 8], [0, 8]], [[1, 6], [1, 0], [2, 3], [1, 0], [1, 1], [2, 2], [0, 3], [0, 7], [0, 9], [0, 4]], [[0, 4], [0, 3], [1, 0], [0, 7], [2, 5], [0, 2], [0, 3]]];

var words = indxStrArr.map(function (item, i) {
  return item.map(function (item) {
    return keyboard[item[0]][item[1]];
  }).join('');
});
//console.log(words);

var _ref = [].concat(_toConsumableArray(words)),
    w1 = _ref[0],
    w2 = _ref[1],
    w3 = _ref[2];

console.log(w1, w2, w3);