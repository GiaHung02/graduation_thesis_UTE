import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getDatabase,
    ref,
    child,
    get,
    push,
    update,
    onValue,
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
                // get password firebase
                get(child(dbRef, "/login/password"))
                    .then((snapshotPassword) => {
                        if (snapshotPassword.exists()) {
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

// ===================================== SOLENOID VALVE 1 ====================================================
const solenoidValveStatus = document.querySelector('.solenoid-valve-status');
const solenoidCard = document.querySelector('.solenoid-valve-card');
const solenoidValveRef = ref(db, '/monitor/solenoidValve-1/status');
onValue(solenoidValveRef, (snapshot) => {
    const data = snapshot.val();
    if (data === 1) {
        solenoidValveStatus.innerHTML = "On";
        solenoidCard.style.borderColor = '#30a444';
    } else {
        solenoidValveStatus.innerHTML = "Off";
        solenoidCard.style.borderColor = 'red';
    }
});

// ===================================== SOLENOID VALVE 2 ====================================================
const solenoidValveStatus2 = document.querySelector('.solenoid-valve-status-2');
const solenoidCard2 = document.querySelector('.solenoid-valve-card-2');
const solenoidValveRef2 = ref(db, '/monitor/solenoidValve-2/status');
onValue(solenoidValveRef2, (snapshot) => {
    const data = snapshot.val();
    if (data === 1) {
        solenoidValveStatus2.innerHTML = "On";
        solenoidCard2.style.borderColor = '#30a444';
    } else {
        solenoidValveStatus2.innerHTML = "Off";
        solenoidCard2.style.borderColor = 'red';
    }
});

// ===================================== BYPASS VALVE ====================================================

const bypassValveRef = ref(db, '/monitor/bypassValve/status');
onValue(bypassValveRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(snapshot.val());
    const bypassValveStatus = document.querySelector('.bypass-valve-status');
    // console.log(typeof snapshot.val());
    const bypassCard = document.querySelector('.bypass-valve-card');

    if (data === 1) {
        bypassValveStatus.innerHTML = "On";
        bypassCard.style.borderColor = '#30a444';
    } else {
        bypassValveStatus.innerHTML = "Off";
        bypassCard.style.borderColor = 'red';
    }
});

// ===================================== DAMPER ====================================================

const damperRef = ref(db, '/monitor/damper/status');
onValue(damperRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(snapshot.val());
    const damperStatus = document.querySelector('.damper-status');
    // console.log(typeof snapshot.val());
    const damperCard = document.querySelector('.damper-card');

    if (data === 1) {
        damperStatus.innerHTML = "On";
        damperCard.style.borderColor = '#30a444';
    } else {
        damperStatus.innerHTML = "Off";
        damperCard.style.borderColor = 'red';
    }
});


// ===================================== TEMPERATURE VALUE ====================================================

const temperatureRef = ref(db, '/monitor/temperature');
onValue(temperatureRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(snapshot.val());
    const temperatureValue = document.querySelector('.temperature-value');
    temperatureValue.innerHTML = data + '<span class="parenthesis"> (°C) </span>';
});

// ===================================== CO2 VALUE ====================================================
const co2Ref = ref(db, '/monitor/CO2');
onValue(co2Ref, (snapshot) => {
    const data = snapshot.val();
    // console.log(snapshot.val());
    const co2Value = document.querySelector('.co2-value');
    co2Value.innerHTML = data + '<span class="parenthesis"> (Ppm) </span>';
});

// ===================================== PRESSURE VALUE ====================================================
const pressureRef = ref(db, '/monitor/pressure');
onValue(pressureRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(snapshot.val());
    const pressureValue = document.querySelector('.pressure-value');
    pressureValue.innerHTML = data + '<span class="parenthesis"> (Pa) </span>';
});

// ===================================== CENTRIFUGAL FAN: SPEED ====================================================
const centrifugalFanSpeedRef = ref(db, '/monitor/centrifugalFan/speed');
onValue(centrifugalFanSpeedRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(snapshot.val());
    const speedValue = document.querySelector('.speed-value');
    speedValue.innerHTML = data + '<span class="parenthesis"> (rpm) </span>';
});

// ===================================== CENTRIFUGAL FAN: Frequency ================================================
const centrifugalFanFrequencyRef = ref(db, '/monitor/centrifugalFan/frequency');
onValue(centrifugalFanFrequencyRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(snapshot.val());
    const frequencyValue = document.querySelector('.hz-value');
    frequencyValue.innerHTML = data + '<span class="parenthesis"> (Hz) </span>';
});

// ===================================== CENTRIFUGAL FAN: Current ================================================
const centrifugalFanCurrentRef = ref(db, '/monitor/centrifugalFan/current');
onValue(centrifugalFanCurrentRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(snapshot.val());
    const currentValue = document.querySelector('.current-value');
    currentValue.innerHTML = data + '<span class="parenthesis"> (A) </span>';
});

// ===================================== CENTRIFUGAL FAN: Voltage ================================================
const centrifugalFanVoltageRef = ref(db, '/monitor/centrifugalFan/voltage');
onValue(centrifugalFanVoltageRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(snapshot.val());
    const voltageValue = document.querySelector('.voltage-value');
    voltageValue.innerHTML = data + '<span class="parenthesis"> (V) </span>';
});
// ===================================== SETPOINT: TEMPERATURE ================================================

// UPDATE TEMPERATURE SETPOINT
function updateTemperatureSetpoint(temperatureSetpoint) {
    const updates = {};
    updates['/control/setpoint/temperature'] = temperatureSetpoint;
    update(dbRef, updates);
}

const temperatureForm = document.querySelector('.temperature-form');

temperatureForm.addEventListener('submit', function (e) {
    e.preventDefault();
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
                const temperatureSetpointInput = parseInt(document.querySelector('.temperature-setpoint-input').value);
                updateTemperatureSetpoint(temperatureSetpointInput);
                document.querySelector('.temperature-setpoint-input').value = '';
            });
        }
    });

});

// READ TEMPERATURE SETPOINT
const currentTemperatureSetpoint = document.querySelector('.current-temp-setpoint');
const temperatureSetpointRef = ref(db, '/control/setpoint/temperature');
onValue(temperatureSetpointRef, (snapshot) => {
    const data = snapshot.val();
    currentTemperatureSetpoint.innerHTML = data + '<span class="parenthesis"> (°C) </span>';
});

// ===================================== SETPOINT: PRESSURE ================================================

// UPDATE TEMPERATURE SETPOINT
function updatePressureSetpoint(pressureSetpoint) {
    const updates = {};
    updates['/control/setpoint/pressure'] = pressureSetpoint;
    update(dbRef, updates);
}

const pressureForm = document.querySelector('.pressure-form');
pressureForm.addEventListener('submit', function (e) {
    e.preventDefault();

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
                const pressureSetpointInput = parseInt(document.querySelector('.pressure-setpoint-input').value);
                updatePressureSetpoint(pressureSetpointInput);
                document.querySelector('.pressure-setpoint-input').value = '';
            });
        }
    });


});

// READ TEMPERATURE SETPOINT
const currentPressureSetpoint = document.querySelector('.current-pressure-setpoint');
const pressureSetpointRef = ref(db, '/control/setpoint/pressure');
onValue(pressureSetpointRef, (snapshot) => {
    const data = snapshot.val();
    currentPressureSetpoint.innerHTML = data + '<span class="parenthesis"> (Pa) </span>';
});
// ===================================== SETPOINT: CO2 ================================================

// UPDATE TEMPERATURE SETPOINT
function updateCo2Setpoint(co2Setpoint) {
    const updates = {};
    updates['/control/setpoint/co2'] = co2Setpoint;
    update(dbRef, updates);
}

const co2Form = document.querySelector('.co2-form');
co2Form.addEventListener('submit', function (e) {
    e.preventDefault();

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
                const co2SetpointInput = parseInt(document.querySelector('.co2-setpoint-input').value);
                updateCo2Setpoint(co2SetpointInput);
                document.querySelector('.co2-setpoint-input').value = '';
            });
        }
    });


});

// READ CO2 SETPOINT
const currentCo2Setpoint = document.querySelector('.current-co2-setpoint');
const co2SetpointRef = ref(db, '/control/setpoint/co2');
onValue(co2SetpointRef, (snapshot) => {
    const data = snapshot.val();
    currentCo2Setpoint.innerHTML = data + '<span class="parenthesis"> (Ppm) </span>';
});

// ===================================== ALERT ================================================
