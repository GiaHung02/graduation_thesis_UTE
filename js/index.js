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

// import { flatpickr } from "https://cdn.jsdelivr.net/npm/flatpickr"

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

const bypassValveRef = ref(db, '/monitor/bypassValve/value');
onValue(bypassValveRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(snapshot.val());
    const bypassValveStatus = document.querySelector('.bypass-valve-status');
    // console.log(typeof snapshot.val());
    const bypassCard = document.querySelector('.bypass-valve-card');

    if (data >= 1) {
        bypassValveStatus.innerHTML = data + "%";
        bypassCard.style.borderColor = '#30a444';
    } else {
        bypassValveStatus.innerHTML = data;
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
var temperature = 0;
onValue(temperatureRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(snapshot.val());
    const temperatureValue = document.querySelector('.temperature-value');
    temperatureValue.innerHTML = data + '<span class="parenthesis">°C</span>';
    temperature = data;
});

// ===================================== CO2 VALUE ====================================================
const co2Ref = ref(db, '/monitor/CO2');
var co2 = 0;
onValue(co2Ref, (snapshot) => {
    const data = snapshot.val();
    // console.log(snapshot.val());
    const co2Value = document.querySelector('.co2-value');
    co2Value.innerHTML = data + '<span class="parenthesis"> Ppm </span>';
    co2 = data;
});

// ===================================== PRESSURE VALUE ====================================================
const pressureRef = ref(db, '/monitor/pressure');
var pressure = 0
onValue(pressureRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(snapshot.val());
    const pressureValue = document.querySelector('.pressure-value');
    pressureValue.innerHTML = data + '<span class="parenthesis"> Pa </span>';
    pressure = data;
});

// ===================================== CENTRIFUGAL FAN: STATUS ================================================
const centrifugalFanStatusRef = ref(db, '/monitor/centrifugalFan/status');
onValue(centrifugalFanStatusRef, (snapshot) => {
    const data = snapshot.val();
    const statusValue = document.querySelector('.fan-status');
    const fanCard = document.querySelector('.fan-card');
    if (data === 1) {
        statusValue.innerHTML = "On";
        fanCard.style.borderColor = '#30a444';
    } else {
        statusValue.innerHTML = 'Off';
        fanCard.style.borderColor = 'red';
    }
});

// ===================================== WATER PRESSURE 1: VALUE ================================================
// ===================================== WATER PRESSURE 2: VALUE ================================================
const waterPressure1ValueRef = ref(db, '/monitor/waterPressure-1/value');
const waterPressure2ValueRef = ref(db, '/monitor/waterPressure-2/value');
onValue(waterPressure1ValueRef, (snapshot) => {
    const data = snapshot.val();
    const waterPressure1Value = document.querySelector('.water-pressure-1-value');
    const waterPressureCard = document.querySelector('.water-pressure-1-card');
    waterPressure1Value.innerHTML = data + 'Pa';
    waterPressureCard.style.borderColor = '#30a444';
});
onValue(waterPressure2ValueRef, (snapshot) => {
    const data = snapshot.val();
    const waterPressure2Value = document.querySelector('.water-pressure-2-value');
    const waterPressure2Card = document.querySelector('.water-pressure-2-card');
    waterPressure2Value.innerHTML = data + 'Pa';
    waterPressure2Card.style.borderColor = '#30a444';
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
var temperatureSetpoint = 0;
const temperatureSetpointRef = ref(db, '/control/setpoint/temperature');
onValue(temperatureSetpointRef, (snapshot) => {
    const data = snapshot.val();
    currentTemperatureSetpoint.innerHTML = data + '<span class="parenthesis">°C</span>';
    temperatureSetpoint = data;
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

// READ PRESSURE SETPOINT
const currentPressureSetpoint = document.querySelector('.current-pressure-setpoint');
var pressureSetpoint = 0;
const pressureSetpointRef = ref(db, '/control/setpoint/pressure');
onValue(pressureSetpointRef, (snapshot) => {
    const data = snapshot.val();
    currentPressureSetpoint.innerHTML = data + '<span class="parenthesis"> Pa </span>';
    pressureSetpoint = data;
});
// ===================================== SETPOINT: CO2 ================================================

// UPDATE CO2 SETPOINT
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
var co2Setpoint = 0;
const co2SetpointRef = ref(db, '/control/setpoint/co2');
onValue(co2SetpointRef, (snapshot) => {
    const data = snapshot.val();
    currentCo2Setpoint.innerHTML = data + '<span class="parenthesis"> Ppm </span>';
    co2Setpoint = data;
});

// ===================================== ANIMATION: BLINK ================================================
const updateBlink = () => {
    // Temperature
    const temperatureCard = document.querySelector('.temperature-card');
    if (temperature < temperatureSetpoint || temperature > temperatureSetpoint) {
        temperatureCard.style.borderColor = 'red';
        temperatureCard.classList.add('blink');
    } else {
        temperatureCard.style.borderColor = '#18a4bc';
        temperatureCard.classList.remove('blink');
    }

    // Pressure
    const pressureCard = document.querySelector('.pressure-card');
    if (pressure < pressureSetpoint || pressure > pressureSetpoint) {
        pressureCard.style.borderColor = 'red';
        pressureCard.classList.add('blink');
    } else {
        pressureCard.style.borderColor = '#30a444';
        pressureCard.classList.remove('blink');
    }

    // Co2
    const co2Card = document.querySelector('.co2-card');
    if (co2 < co2Setpoint || co2 > co2Setpoint) {
        co2Card.style.borderColor = 'red';
        co2Card.classList.add('blink');
    } else {
        co2Card.style.borderColor = '#ffc404';
        co2Card.classList.remove('blink');
    }
}

setInterval(updateBlink, 1000);

// ===================================== BUTTON: ON/OFF ================================================
const btnOn = document.querySelector('.btn-on');
const btnOff = document.querySelector('.btn-off');
var onOffToggle = false;

function turnOffComponents(status, bypassStatus) {
    const db = getDatabase();

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/monitor/bypassValve/status'] = bypassStatus;
    updates['/monitor/centrifugalFan/status'] = status;
    updates['/monitor/damper/status'] = status;
    updates['/monitor/solenoidValve-1/status'] = status;
    updates['/monitor/solenoidValve-2/status'] = status;
    return update(ref(db), updates);
}


// GET DATA TO SHOW STATUS ON OFF
const onOffModeRef = ref(db, '/control/on-off');
onValue(onOffModeRef, (snapshot) => {
    const data = snapshot.val();
    if (data === 1) {
        // ON
        document.querySelector('.btn-on').style.backgroundColor = 'green';

        // btn auto and manual mode
        document.querySelector('.btn-auto').disabled = false;
        document.querySelector('.btn-manual').disabled = false;

        document.querySelector('#datetimepicker-start-time').disabled = false;
        document.querySelector('#datetimepicker-end-time').disabled = false;
        document.querySelector('.btn-time').disabled = false;


        // 
    } else {
        // OFF
        document.querySelector('.btn-off').style.backgroundColor = 'red';

        // btn auto and manual mode
        document.querySelector('.btn-auto').disabled = true;
        document.querySelector('.btn-manual').disabled = true;
        document.querySelector('#datetimepicker-start-time').disabled = true;
        document.querySelector('#datetimepicker-end-time').disabled = true;
        document.querySelector('.btn-time').disabled = true;


        // OFF ALL THE COMPONENTS
        turnOffComponents(0, 1);
    }

});


// UPDATING DATA
const btnOnFunction = () => {
    // onOffToggle = !onOffToggle;

    const updates = {};
    updates[`/control/on-off`] = 1;
    update(dbRef, updates);
}

const btnOffFunction = () => {
    const updates = {};
    updates[`/control/on-off`] = 0;
    update(dbRef, updates);
}

btnOn.addEventListener('click', () => {
    // onOffToggle = !onOffToggle;
    document.querySelector('.btn-on').style.backgroundColor = 'green';
    document.querySelector('.btn-off').style.backgroundColor = 'grey';
    btnOnFunction();
});

btnOff.addEventListener('click', () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "The system will be shut down",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Shut down!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Handle the logout process here
            Swal.fire(
                'Shut Down!',
                'System shut down',
                'success'
            ).then(() => {
                document.querySelector('.btn-on').style.backgroundColor = 'grey';
                document.querySelector('.btn-off').style.backgroundColor = 'red';
                btnOffFunction();
                console.log(document.querySelectorAll('.form'));

                turnOffComponents(0, 1)
                // document.querySelector('.btn-auto').disabled = true;
                // document.querySelector('.btn-manual').disabled = true;
            });
        }
    });
});

// ===================================== AUTO / MANUAL MODE ================================================
const autoForm = document.querySelector('.auto-form');
const manualForm = document.querySelector('.manual-form');

// GET AUTO MANUAL STATUS

const autoModeRef = ref(db, '/control/mode/auto');
onValue(autoModeRef, (snapshot) => {
    const data = snapshot.val();
    if (data === 1) {
        document.querySelector('.btn-auto').style.backgroundColor = 'green';
        document.querySelector('.btn-manual').style.backgroundColor = 'black';
        document.querySelector('.time-selection-pickr').style.display = 'block';
        document.querySelector('.manual-table').style.display = 'none';
        console.log('Auto mode activated, manual table hidden');  // Debug log
    } else {
        document.querySelector('.btn-auto').style.backgroundColor = 'black';
        document.querySelector('.btn-manual').style.backgroundColor = 'green';
        document.querySelector('.time-selection-pickr').style.display = 'none';
        document.querySelector('.manual-table').style.display = '';
        console.log('Manual mode activated, manual table shown');  // Debug log
    }
});


// UPDATE AUTO MANUAL MODE
function updateAutoManualMode(auto, manual) {
    const db = getDatabase();

    // A post entry.
    const postData = {
        auto: auto,
        manual: manual
    };

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/control/mode'] = postData;
    return update(ref(db), updates);
};

autoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    Swal.fire({
        title: 'Are you sure?',
        text: "Manual Mode will be turned on!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Turn On!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Handle the logout process here
            Swal.fire(
                'Manual Mode!',
                'Turn On Manual Mode',
                'success'
            ).then(() => {
                document.querySelector('.btn-auto').style.backgroundColor = 'green';
                document.querySelector('.btn-manual').style.backgroundColor = 'black';
                updateAutoManualMode(1, 0);
            });
        }
    });
});

manualForm.addEventListener('submit', function (e) {
    e.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "Manual Mode will be turned on!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Turn On!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Handle the logout process here
            Swal.fire(
                'Manual Mode!',
                'Turn On Manual Mode',
                'success'
            ).then(() => {
                document.querySelector('.btn-auto').style.backgroundColor = 'black';
                document.querySelector('.btn-manual').style.backgroundColor = 'green';
                updateAutoManualMode(0, 1);
            });
        }
    });

});


// ===================================== FLATPICKR ================================================

var autoModeSetInterval;
const autoMode = () => {
    var startTime;
    var endTime;
    const pickrForm = document.querySelector('.date-time-pickr-form');

    const initFlatpickr = (selector, callback) => {
        flatpickr(selector, {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            onChange: (selectedDates) => {
                callback(selectedDates[0]);
            }
        });
    };

    initFlatpickr("#datetimepicker-start-time", (date) => {
        startTime = date;
        console.log("Selected Start Time:", startTime);
    });

    initFlatpickr("#datetimepicker-end-time", (date) => {
        endTime = date;
        console.log("Selected End Time:", endTime);
    });

    const submitTimes = () => {
        if (startTime && endTime) {
            const startTimeInMinutes = startTime.getHours() * 60 + startTime.getMinutes();
            const endTimeInMinutes = endTime.getHours() * 60 + endTime.getMinutes();

            if (endTimeInMinutes > startTimeInMinutes) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });

                const updates = {
                    '/control/start-time': startTimeInMinutes,
                    '/control/end-time': endTimeInMinutes
                };

                update(dbRef, updates);
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "End time must be later than start time",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } else {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Please select both start and end times",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    pickrForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitTimes();
    });

    const controlFan = () => {
        get(child(dbRef, `/control/start-time`)).then((startTimeSnapShot) => {
            if (startTimeSnapShot.exists()) {
                get(child(dbRef, `/control/end-time`)).then((endTimeSnapShot) => {
                    if (endTimeSnapShot.exists()) {
                        const startTimeInMinutes = startTimeSnapShot.val();
                        const endTimeInMinutes = endTimeSnapShot.val();

                        const now = new Date();
                        const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

                        const updates = {
                            '/monitor/centrifugalFan/status': (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes) ? 1 : 0,
                            '/monitor/bypassValve/status': (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes) ? 0 : 1,
                            '/monitor/damper/status': 0,
                            '/monitor/solenoidValve-1/status': 0,
                            '/monitor/solenoidValve-2/status': 0
                        };

                        update(dbRef, updates);
                        document.querySelector('.animation').style.display = (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes) ? 'block' : 'none';
                    } else {
                        console.log("No end time data available");
                    }
                }).catch(console.error);
            } else {
                console.log("No start time data available");
            }
        }).catch(console.error);
    };

    autoModeSetInterval = setInterval(controlFan, 1000);

    const convertMinuteToHour = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = String(totalMinutes % 60).padStart(2, '0');
        return { hours, minutes };
    };

    const displayTime = (refPath, elementSelector) => {
        onValue(ref(db, refPath), (snapshot) => {
            const data = snapshot.val();
            const { hours, minutes } = convertMinuteToHour(data);
            document.querySelector(elementSelector).innerHTML = `${hours}:${minutes}`;
        });
    };

    displayTime('/control/start-time', '.current-start-time');
    displayTime('/control/end-time', '.current-end-time');
};



// ===================================== MANUAL MODE ================================================
const manualMode = () => {
    // READ
    const centrifugalFanRef = ref(db, '/monitor/centrifugalFan/status');
    const damperRef = ref(db, '/monitor/damper/status');
    const solenoidValve1Ref = ref(db, '/monitor/solenoidValve-1/status');
    const solenoidValve2Ref = ref(db, '/monitor/solenoidValve-2/status');

    onValue(centrifugalFanRef, (snapshot) => {
        const data = snapshot.val();
        if (data === 1) {
            document.querySelector('.btn-fan-on').style.backgroundColor = 'green';
            document.querySelector('.btn-fan-off').style.backgroundColor = 'grey';
        } else {
            document.querySelector('.btn-fan-off').style.backgroundColor = 'red';
            document.querySelector('.btn-fan-on').style.backgroundColor = 'grey';
        }
    });

    onValue(damperRef, (snapshot) => {
        const data = snapshot.val();
        if (data === 1) {
            document.querySelector('.btn-damper-on').style.backgroundColor = 'green';
            document.querySelector('.btn-damper-off').style.backgroundColor = 'grey';
        } else {
            document.querySelector('.btn-damper-off').style.backgroundColor = 'red';
            document.querySelector('.btn-damper-on').style.backgroundColor = 'grey';
        }
    });

    onValue(solenoidValve1Ref, (snapshot) => {
        const data = snapshot.val();
        console.log('damper', data);
        if (data === 1) {
            document.querySelector('.btn-solenoid-1-on').style.backgroundColor = 'green';
            document.querySelector('.btn-solenoid-1-off').style.backgroundColor = 'grey';
        } else {
            document.querySelector('.btn-solenoid-1-off').style.backgroundColor = 'red';
            document.querySelector('.btn-solenoid-1-on').style.backgroundColor = 'grey';
        }
    });

    onValue(solenoidValve2Ref, (snapshot) => {
        const data = snapshot.val();
        console.log('damper', data);
        if (data === 1) {
            document.querySelector('.btn-solenoid-2-on').style.backgroundColor = 'green';
            document.querySelector('.btn-solenoid-2-off').style.backgroundColor = 'grey';
        } else {
            document.querySelector('.btn-solenoid-2-off').style.backgroundColor = 'red';
            document.querySelector('.btn-solenoid-2-on').style.backgroundColor = 'grey';
        }
    });

    // UPDATE FANf
    function updateCentrifugalFanStatus(fanStatus) {
        const updates = {};
        updates[`/monitor/centrifugalFan/status`] = fanStatus;
        update(dbRef, updates);
    }
    document.querySelector('.btn-fan-on').addEventListener('click', function () {
        document.querySelector('.animation').style.display = 'block';
        updateCentrifugalFanStatus(1);
    })
    document.querySelector('.btn-fan-off').addEventListener('click', function () {
        document.querySelector('.animation').style.display = 'none';
        updateCentrifugalFanStatus(0);
    })

    //UPDATE DAMPER
    function updateDamperStatus(damperStatus) {
        const updates = {};
        updates[`/monitor/damper/status`] = damperStatus;
        update(dbRef, updates);
    }
    document.querySelector('.btn-damper-on').addEventListener('click', function () {
        updateDamperStatus(1);
    })
    document.querySelector('.btn-damper-off').addEventListener('click', function () {
        updateDamperStatus(0);
    })

    // UPDATE SOLENOID VALVE 1
    function updateSolenoidValve1Status(solenoidValve1Status) {
        const updates = {};
        updates[`/monitor/solenoidValve-1/status`] = solenoidValve1Status;
        update(dbRef, updates);
    }
    document.querySelector('.btn-solenoid-1-on').addEventListener('click', function () {
        updateSolenoidValve1Status(1);
    })
    document.querySelector('.btn-solenoid-1-off').addEventListener('click', function () {
        updateSolenoidValve1Status(0);
    })

    // UPDATE SOLENOID VALVE 2
    function updateSolenoidValve2Status(solenoidValve2Status) {
        const updates = {};
        updates[`/monitor/solenoidValve-2/status`] = solenoidValve2Status;
        update(dbRef, updates);
    }
    document.querySelector('.btn-solenoid-2-on').addEventListener('click', function () {
        updateSolenoidValve2Status(1);
    })
    document.querySelector('.btn-solenoid-2-off').addEventListener('click', function () {
        updateSolenoidValve2Status(0);
    })
    // UPDATE BYPASS VALVE
    function updateBypassValue(bypassValue) {
        const updates = {};
        updates[`/monitor/bypassValve/value`] = bypassValue;
        update(dbRef, updates);
    }
    const bypassForm = document.querySelector('.bypass-form')
    bypassForm.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('submit clicked');
        const bypassValue = parseInt(document.querySelector('.bypass-value').value);
        console.log(`bypass value: ${bypassValue}`);

        if (bypassValue <= 100 && bypassValue >= 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your value has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            updateBypassValue(bypassValue);
        } else {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Please select both start and end times",
                showConfirmButton: false,
                timer: 1500
            });
        }
    })
}

// ===================================== SELECT AUTO AND MANUAL ================================================

onValue(autoModeRef, (snapshot) => {
    const data = snapshot.val();
    if (data === 1) {
        autoMode();
    } else {
        clearInterval(autoModeSetInterval);
        manualMode();
    }
});