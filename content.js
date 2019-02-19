chrome.runtime.onMessage.addListener(hasGotMessage);

function hasGotMessage(response, sender, sendResponse) {
    switch (response.type) {
        case 'clickResponse':
            _goibibo_fillUp(true);
            break;
        case 'updatedTab':
            fillupInitiator();
        break;
    }
}

var passengerType = ['Adult', 'Child', 'Infant'];
var alphabets = ['z', 'a', 'b', 'c' ,'d', 'e', 'f', 'g', 'h' ,'i'];

function fillIn(passenger, i) {
    if (document.getElementById(passenger + 'firstName' + i)) {
        if (document.getElementById(passenger + 'title' + i)) {
            document.getElementById(passenger + 'title' + i).value = passenger !== 'Adult' ? '4' : '1';
        }
        document.getElementById(passenger + 'firstName' + i).value = passenger;
        document.getElementById(passenger + 'middleName' + i).value = '';
        document.getElementById(passenger + 'lastName' + i).value = 'Last ' + alphabets[i];
        /* Checking if DOB is required */
        if (document.getElementById(passenger + 'dob_day' + i)) {
            var year = new Date().getFullYear() - 22;
            if (passenger === 'Child') {
                year = new Date().getFullYear() - 3;
            } else if (passenger === 'Infant') {
                year = new Date().getFullYear() - 1;
            }
            document.getElementById(passenger + 'dob_day' + i).value = '01';
            document.getElementById(passenger + 'dob_month' + i).value = '01';
            document.getElementById(passenger + 'dob_year' + i).value = year.toString();
        }
        if (document.getElementById(passenger + 'passport' + i)) {
            var expYear = new Date().getFullYear() + 1;
            document.getElementById(passenger + 'passport' + i).value = 'ABCD1234XYZ' + i;
            if ( document.getElementById(passenger + 'national' + i)) {
                document.getElementById(passenger + 'national' + i).value = 'IN';
                document.getElementById(passenger + 'exp_day' + i).value = '01';
                document.getElementById(passenger + 'exp_month' + i).value = '01';
                document.getElementById(passenger + 'exp_year' + i).value = expYear.toString();
                document.getElementById(passenger + 'visaType' + i).value = 'tourist';
            }
        }
    }
}
function _goibibo_fillUp() {
    passengerType.map((passenger) => {
        /* To Iterate through 1 to 9(max allowed pax) */
        for (let i = 1; i < 10 ; i++) {
            fillIn(passenger, i);
        }
    });
    if (document.getElementById('pancard')) {
        document.getElementById('pancard').value = 'ABCDE1234F';
    }
    document.getElementById('email').value = 'goibibo@go-mmt.com';
    document.getElementById('mobile').value = '1234567890';
    window.__gi_filledUp = true;
    console.log('Filled User Data');
};

function fillupInitiator() {
    window.__gi_filledUp = false;
    var callFillup = function() {
        setTimeout(function() {
            if (document.getElementById('Adulttitle1')) {
                _goibibo_fillUp();
            } else {
                callFillup();
            }
        }, 1000);
    };
    
    if (!(window.__gi_filledUp)) {
        if (window.location.href.includes('flight-review')) {
            callFillup();
            window.__gi_filledUp = true;
        }
    } else {
        window.__gi_filledUp = false;
    }
}
