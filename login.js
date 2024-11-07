// Handle login
document.querySelector('.login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the values of the input fields
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Get stored users from local storage
  var users = JSON.parse(localStorage.getItem('users')) || [];

  // Find if the user exists
  var user = users.find(user => user.username === username && user.password === password);

  if (user) {
      document.getElementById('message').innerText = "Welcome";
      // Redirect to a new page if the credentials are correct
      window.location.href = "home.html";
  } else {
      // Display an error message if the credentials are incorrect
      document.getElementById('message').innerText = "Invalid username or password. Please try again.";
  }
});

// Handle registration
document.querySelector('.register-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the values of the input fields
  var username = event.target.querySelector('input[placeholder="name"]').value;
  var password = event.target.querySelector('input[placeholder="password"]').value;
  var email = event.target.querySelector('input[placeholder="email address"]').value;

  // Get stored users from local storage
  var users = JSON.parse(localStorage.getItem('users')) || [];

  // Check if the user already exists
  var userExists = users.some(user => user.username === username || user.email === email);

  if (userExists) {
      document.getElementById('message').innerText = "User already exists. Please use a different username or email.";
  } else {
      // Add new user to the users array
      users.push({ username: username, password: password, email: email });

      // Store updated users array in local storage
      localStorage.setItem('users', JSON.stringify(users));

      document.getElementById('message').innerText = "Registration successful! You can now log in.";
  }
});

// Toggle between Login and Register forms
$(".message a").click(function () {
  $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
});
