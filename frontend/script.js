//< script > src = "global.js" </script >;

const main = document.getElementById("section")
const form = document.getElementById("form")
const link = document.getElementById("query")
const status = document.getElementById("status")
const image = document.getElementById("image")
const d_button = document.getElementById("d_button")
const logout_button = document.getElementById("logout-button")

const APILINK = 'http://127.0.0.1:8000/api/v1/madk'
const username = document.getElementById("username")

function init() {
    status.innerText = APILINK
    fetch(APILINK + "/random/" + localStorage.getItem("currentUser"), {
        method: "GET",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("No image found");
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            console.log("res.json().result", result);
            console.log(result.url);
            image.setAttribute("src", result.url);
            status.innerText = "Random Image";
        })
        .catch(error => {
            console.error('Error:', error);
            if (error.message === "No image found") {
                status.innerText = "No image found";
            } else {
                status.innerText = "Error fetching random image";
            }
        });
}

// Call init() when the page loads
document.addEventListener('DOMContentLoaded', init);

function randomWinter() {
    fetch(APILINK + "/random/" + localStorage.getItem("currentUser"), {
        method: "GET",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("No image found");
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log("response", response);
            const res = response.json();
            console.log("response.json()", res);
            return res;
        })
        .then(result => {
            console.log("result", result);
            console.log(result.url);
            image.setAttribute("src", result.url);
            status.innerText = "Random Image";
        })
        .catch(error => {
            console.error('Error:', error);
            if (error.message === "No image found") {
                status.innerText = "No image found";
            } else {
                status.innerText = "Error fetching random image";
            }
        });
}

image.onclick = () => {
    randomWinter();
};
logout_button.onclick = () => {
    fetch(APILINK + "/logout", {
        method: "PUT",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            location.replace("./login.html");
            GLOBALS.currentUser = null;
        })
        .catch(error => {
            console.error('Error:', error);
            status.innerText = "Error logging out";
        });
}
d_button.onclick = () => {
    const currentImageUrl = image.getAttribute("src");
    try {
        fetch(APILINK + "/delete", {
            method: "DELETE",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "url": currentImageUrl, "username": localStorage.getItem("currentUser") })
        });
    } catch (error) {
        console.error('Error:', error);
        status.innerText = 'Failed to Delete!!';
    }
    status.innerText = 'Delete Completed!!';
    randomWinter();
}
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission
    image.setAttribute("src", link.value);
    const linkItem = link.value;
    status.innerText = "Loading ....";

    if (linkItem) {
        fetch(APILINK + "/new", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "url": linkItem, "username": localStorage.getItem("currentUser") })

        }).then(res => res.json())
            .then(res => {
                console.log(res);
                // Instead of reloading, update the UI here
                status.innerText = "Submitted successfully";
                link.value = ''; // Clear the input field
            })
            .catch(error => {
                console.error('Error:', error);
                status.innerText = "Error submitting";
            });
    }
});
