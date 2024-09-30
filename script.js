function scrollToSection() {
  document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

// Simulating a user object in local storage
// In a real application, you would use a proper authentication system
const user = JSON.parse(localStorage.getItem('user'));

if (user) {
    // If user is logged in, show their profile picture and username
    document.getElementById('profile-pic').src = user.profilePic; // Set the profile picture URL
    document.getElementById('username').innerText = user.username; // Set the username
    document.getElementById('profile-pic').style.display = 'block'; // Show the profile picture
    document.getElementById('username').style.display = 'block'; // Show the username
} else {
    // If not logged in, redirect to login page
    window.location.href = 'login.html'; // Change this to your login page URL
}
