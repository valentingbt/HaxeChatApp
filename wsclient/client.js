(function () {
  var ws = new WebSocket("ws://localhost:1338");

  var chatform = document.querySelector('.chatform');
  var loginform = document.querySelector('.loginform');
  var registerform = document.querySelector('.registerform');
  var exitform = document.querySelector('.exit');
  document.querySelector('body').style.display = 'none';
  verifyToken();

  async function logIn(login, password) {
    let userAnswer = {
      "username": login,
      "password": password
    }
    const loginResponse = await fetch('http://localhost:1337/login', {
      method: 'POST',
      body: JSON.stringify(userAnswer),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    if (loginResponse.ok) {
      // Hide login and register
      verifyToken();
    } else {
      document.getElementById('error').innerHTML = 'Bad password or username, please try again'
    }
  }

  async function logOut() {
    const ticketResponse = await fetch('http://localhost:1337/logout', {
      method: 'POST',
      credentials: 'include'
    });
  }

  async function subscribe(login, password, email) {

    let userAnswer = {
      "username": login,
      "password": password,
      "email": email
    }
    const subscribeResponse = await fetch('http://localhost:1337/subscribe', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userAnswer),
    }).then(res => res.json())
      .then(res => console.log(res));
      console.log(subscribeResponse);
      if(subscribeResponse.ok) {
        document.getElementById('info').innerHTML = 'You have been successfully registered, you can log in.'
      }
  }

  async function verifyToken() {
    const ticketResponse = await fetch('http://localhost:1337/wsTicket', {
      method: 'GET',
      credentials: 'include'
    });

    const ticketResponseValue = await ticketResponse.text();
    console.log(ticketResponse);
    if (ticketResponse.ok) {
      ws.send(ticketResponseValue);
      document.querySelector('input[name=message]').focus();
      showChatPage();
    } else {
      showHomePage();
    }
  }

  // Hide the Chat Page and show the Home Page
  function showHomePage() {
    document.querySelector('body').style.display = 'block';
    // Show welcome message
    document.getElementById('welcome').innerHTML = "Welcome! Are you new here? <br> Awesome, you can...";
    // Hide login and register message
    document.querySelector('.login-message').style.display = 'block';
    // Show login form
    document.querySelector('#login').style.display = 'block';
    // Show register form
    document.querySelector('#register').style.display = 'block';
    // Hide chat
    document.querySelector('#chat').style.display = 'none';
    // Hide disconnect button
    document.querySelector('.exit').style.display = 'none';

  }

  // Hide the Home Page and show the Chat Page
  function showChatPage() {
    document.querySelector('body').style.display = 'block';
    // Show connected message
    document.getElementById('welcome').innerHTML = "You are connected";
    // Hide login and register message
    document.querySelector('.login-message').style.display = 'none';
    // Hide login form
    document.querySelector('#login').style.display = 'none';
    // Hide register form
    document.querySelector('#register').style.display = 'none';
    // Show chat
    document.querySelector('#chat').style.display = 'block';
    // Show disconnect button
    document.querySelector('.exit').style.display = 'block';

  }

  loginform.onsubmit = function (e) {
    e.preventDefault();
    var loginInput = loginform.querySelector('input[name=username]');
    var passwordInput = loginform.querySelector('input[name=password]');
    var login = loginInput.value;
    var password = passwordInput.value;
    logIn(login, password);
  }

  registerform.onsubmit = function (e) {
    e.preventDefault();
    var loginInput = registerform.querySelector('input[name=login]');
    var passwordInput = registerform.querySelector('input[name=password]');
    var emailInput = registerform.querySelector('input[name=email]');
    var login = loginInput.value;
    var password = passwordInput.value;
    var email = emailInput.value;
    subscribe(login, password, email);
  }

  chatform.onsubmit = function (e) {
    e.preventDefault();
    var input = document.querySelector('input[name=message]');
    var text = input.value;
    ws.send(text);
    input.value = '';
    input.focus();
    return false;
  }

  exitform.onsubmit = function (e) {
    e.preventDefault();
    logOut();
    showHomePage();
  }



  ws.onmessage = function (msg) {
    var response = msg.data;
    var messageList = document.querySelector('.messages');
    var li = document.createElement('li');
    li.textContent = response;
    messageList.appendChild(li);
  }

}());