import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getDatabase,
    ref,
    child,
    get,
    set
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCqmujteqYClVufw6UJzPjrhS6HKcyUc7w",
    authDomain: "graduation-thesis-ebd14.firebaseapp.com",
    databaseURL:
        "https://graduation-thesis-ebd14-default-rtdb.firebaseio.com",
    projectId: "graduation-thesis-ebd14",
    storageBucket: "graduation-thesis-ebd14.appspot.com",
    messagingSenderId: "151058844358",
    appId: "1:151058844358:web:36ca9834bcfb8ad128a5c7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
// var myForm = document.getElementById("myForm");
// console.log(db);

const dbRef = ref(getDatabase());

// ===================================== LOGIN ====================================================

var username = document.querySelector('.username');
var password = document.querySelector('.password');
var form = document.querySelector('.login-form');
var login = document.querySelector('.login');
var errorMessage = document.querySelector('#error-message');
const section = document.querySelector('.content');


form.addEventListener('submit', function (e) {
    e.preventDefault();
    get(child(dbRef, "/login/username"))
        .then((snapshotUsername) => {
            if (snapshotUsername.exists()) {
                console.log('username: ', snapshotUsername.val());
                // get password firebase
                get(child(dbRef, "/login/password"))
                    .then((snapshotPassword) => {
                        if (snapshotPassword.exists()) {
                            console.log('password: ', snapshotPassword.val());
                            console.log(username, password);

                            if (username.value === snapshotUsername.val() && password.value === snapshotPassword.val()) {
                                username.value = '';
                                password.value = '';
                                section.style.display = 'block';
                                login.style.display = 'none';

                            } else {
                                username.value = '';
                                password.value = '';
                                errorMessage.innerHTML = "Incorrect username or password.";
                                errorMessage.style.display = 'block';
                            }
                        } else {
                            console.log("No data available");
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
})



document.querySelector('.username').addEventListener('input', () => {
    document.getElementById('error-message').style.display = 'none';
});

document.querySelector('.password').addEventListener('input', () => {
    document.getElementById('error-message').style.display = 'none';
});


// ===================================== lOGOUT ====================================================

document.getElementById('logout-button').addEventListener('click', (e) => {
    // Perform any necessary logout operations here, such as clearing session storage, cookies, etc.
    // alert('You have been logged out.');
    e.preventDefault(); // Prevent the default button click behavior

    Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Handle the logout process here
            Swal.fire(
                'Logged Out!',
                'You have been logged out.',
                'success'
            ).then(() => {
                // Redirect to the login page or perform any other actions needed after logout
                section.style.display = 'none';
                login.style.display = 'flex';
            });
        }
    });
});

// ===================================== SOLENOID VALVE ====================================================
setInterval(() => {
    get(child(dbRef, "/monitor/solenoidValve-1/status"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                const solenoidValveStatus = document.querySelector('.solenoid-valve-status');
                // console.log(typeof snapshot.val());
                const solenoidCard = document.querySelector('.solenoid-valve-card');

                if (snapshot.val() === 1) {
                    solenoidValveStatus.innerHTML = "On";
                    solenoidCard.style.borderColor = '#30a444';
                } else {
                    solenoidValveStatus.innerHTML = "Off";
                    solenoidCard.style.borderColor = 'red';
                }
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}, 1000);

setInterval(() => {
    get(child(dbRef, "/monitor/solenoidValve-2/status"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                const solenoidValveStatus = document.querySelector('.solenoid-valve-status');
                // console.log(typeof snapshot.val());
                const solenoidCard = document.querySelector('.solenoid-valve-card');

                if (snapshot.val() === 1) {
                    solenoidValveStatus.innerHTML = "On";
                    solenoidCard.style.borderColor = '#30a444';
                } else {
                    solenoidValveStatus.innerHTML = "Off";
                    solenoidCard.style.borderColor = 'red';
                }
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}, 1000);



// ===================================== BYPASS VALVE ====================================================
setInterval(() => {
    get(child(dbRef, "/monitor/bypassValve/status"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                const bypassValveStatus = document.querySelector('.bypass-valve-status');
                // console.log(typeof snapshot.val());
                const bypassCard = document.querySelector('.bypass-valve-card');

                if (snapshot.val() === 1) {
                    bypassValveStatus.innerHTML = "On";
                    bypassCard.style.borderColor = '#30a444';
                } else {
                    bypassValveStatus.innerHTML = "Off";
                    bypassCard.style.borderColor = 'red';
                }
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}, 1000);

// ===================================== DAMPER ====================================================
setInterval(() => {
    get(child(dbRef, "/monitor/damper/status"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                const damperStatus = document.querySelector('.damper-status');
                // console.log(typeof snapshot.val());
                const damperCard = document.querySelector('.damper-card');

                if (snapshot.val() === 1) {
                    damperStatus.innerHTML = "On";
                    damperCard.style.borderColor = '#30a444';
                } else {
                    damperStatus.innerHTML = "Off";
                    damperCard.style.borderColor = 'red';
                }
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}, 1000);


// ===================================== TEMPERATURE VALUE ====================================================
setInterval(() => {
    get(child(dbRef, "/monitor/temperature"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                const temperatureValue = document.querySelector('.temperature-value');
                temperatureValue.innerHTML = snapshot.val() + '<span class="parenthesis"> (°C) </span>';

            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}, 1000);

// ===================================== CO2 VALUE ====================================================
setInterval(() => {
    get(child(dbRef, "/monitor/CO2"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                const co2Value = document.querySelector('.co2-value');
                co2Value.innerHTML = snapshot.val() + '<span class="parenthesis"> (Ppm) </span>';

            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}, 1000);


// ===================================== PRESSURE VALUE ====================================================
setInterval(() => {
    get(child(dbRef, "/monitor/pressure"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                const pressureValue = document.querySelector('.pressure-value');
                pressureValue.innerHTML = snapshot.val() + '<span class="parenthesis"> (Pa) </span>';

            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}, 1000);

// ===================================== CENTRIFUGAL FAN: SPEED ====================================================

setInterval(() => {
    get(child(dbRef, "/monitor/centrifugalFan/speed"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                const speedValue = document.querySelector('.speed-value');
                speedValue.innerHTML = snapshot.val() + '<span class="parenthesis"> (rpm) </span>';

            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}, 1000);

// ===================================== CENTRIFUGAL FAN: Frequency ================================================

setInterval(() => {
    get(child(dbRef, "/monitor/centrifugalFan/frequency"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                const frequencyValue = document.querySelector('.hz-value');
                frequencyValue.innerHTML = snapshot.val() + '<span class="parenthesis"> (Hz) </span>';

            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}, 1000);


// ===================================== CENTRIFUGAL FAN: Current ================================================

setInterval(() => {
    get(child(dbRef, "/monitor/centrifugalFan/current"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                const currentValue = document.querySelector('.current-value');
                currentValue.innerHTML = snapshot.val() + '<span class="parenthesis"> (A) </span>';

            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}, 1000);

// ===================================== CENTRIFUGAL FAN: Voltage ================================================

setInterval(() => {
    get(child(dbRef, "/monitor/centrifugalFan/voltage"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                const voltageValue = document.querySelector('.voltage-value');
                voltageValue.innerHTML = snapshot.val() + '<span class="parenthesis"> (V) </span>';

            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}, 1000);