// Function to handle user login
//<script> src = "global.js"</script>
const status = document.getElementById("status")
const APILINK = 'http://127.0.0.1:8000/api/v1/madk'
async function handleLogin() {
    //event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    await fetch(APILINK + "/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'username': username, 'password': password })
    }).then(res => {
        res.json();
        console.log(username);
        console.log(password);
        console.log(res);
        if (res.status == 401) {
            throw new Error("Invalid username or password");
        }
        status.innerText = 'login successful';
        setTimeout(() => { location.replace("./index.html"); }, 100);
    })
        .then(res => {

        })
        .catch(error => {
            console.error('Error:', error);
            alert('Login failed: ' + error.message);
            return;
        });
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}
async function handleRegister() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    await fetch(APILINK + "/register", {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'username': username, 'password': password })
    }).then(res => {
        res.json();
        console.log(username);
        console.log(password);
        console.log(res);
        if (res.status == 401) {
            throw new Error("User already exists");
        }
        status.innerText = 'register successful';
        setTimeout(() => { location.replace("./login.html"); }, 100);
    }).catch(error => {
        console.error('Error:', error);
        alert('Register failed: ' + error.message);
        return;
    });
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}
document.getElementById('login-button').addEventListener('click', handleLogin);
document.getElementById('register-button').addEventListener('click', handleRegister);

