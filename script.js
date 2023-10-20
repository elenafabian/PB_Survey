// INIT LISTENERS

function init() {

    let scriptURL = "https://script.google.com/macros/s/AKfycbx6wH_a6spYe6ElPZ-fRDrQanGYCfqSMBuqp3u2qvXLmrc6HNgSMGaRqzX0ORgtawkS/exec";
    let numQuestions = 5;

    for (let i = 1; i < numQuestions; i++) {
        let qN = 'q' + i;
        let qform = document.forms[qN];
        qform.addEventListener('submit', e => {
            console.log("submitted " + qN);
            // prevent default POST and replace with a send to the google form
            e.preventDefault();
            fetch(scriptURL, { method: 'POST', body: new FormData(qform) })
            .then(response => console.log('Success!', response))
            .catch(error => console.error('Error!', error.message));
            // set up next question
            completeQ(i);
            showQ(i+1);
        })
    }

    qN = 'q' + numQuestions;
    qform = document.forms[qN];
    qform.addEventListener('submit', e => {
        // prevent default POST and replace with a send to the google form
        console.log("submitted " + qN);
        e.preventDefault();
        fetch(scriptURL, { method: 'POST', body: new FormData(qform) })
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message));
        completeQ(numQuestions);
    })

}
init();

// START SURVEY BUTTON

function startSurvey() {
    let email = ""
    email = document.getElementById('realEmail').value;
    console.log(email)

    let emailFields = document.getElementsByClassName('autoparam email');
    for (let i = 0; i < emailFields.length; i++) {
        emailFields[i].value = email;
    }

    let q0email = document.getElementsByClassName('q0email');
    console.log(q0email);
    q0email[0].hidden =  true;

    showQ(1);

    return;
}

// MOVE TO NEXT QUESTION

function showQ(n) {
    let q1Elements = document.getElementsByClassName('q' + n);

    for (var i = 0; i < q1Elements.length; i++) {
        q1Elements[i].removeAttribute('hidden');
    }

    let wherey = where();
    let whaty = what();
    let whoy = who();
    let whyy = why(whoy);
    let persistencey = persistence();

    let scenarioString = "You are in " + wherey + " and your raw data will be held in the trusted privacy backplane " + persistencey + ". ";
    scenarioString += "The " + whoy + " is trying to collect " + whaty + " from your data. ";
    scenarioString += "The reason is " + whyy + ".";
    let scenarioStatement = document.getElementById('scenario' + n);
    scenarioStatement.innerHTML = scenarioString;

    var q1where = document.getElementById('where' + n);
    q1where.value = wherey;
    q1where.readOnly = true;

    var q1what = document.getElementById('what' + n);
    q1what.value = whaty;
    q1what.readOnly = true;

    var q1who = document.getElementById('who' + n);
    q1who.value = whoy;
    q1who.readOnly = true;

    var q1why = document.getElementById('why' + n);
    q1why.value = whyy;
    q1why.readOnly = true;

    var q1persistence = document.getElementById('persistence' + n);
    q1persistence.value = persistencey;
    q1persistence.readOnly = true;

    return;
}

function completeQ(n) {
    let q1Elements = document.getElementsByClassName('q' + n);

    for (var i = 0; i < q1Elements.length; i++) {
        q1Elements[i].hidden = true;
    }

    return;
}

// FINISH SURVEY
function finishSurvey() {
    return;
}

///////////////////////
// PROMPT GENERATORS //
///////////////////////

function where() {
    return 'a grocery store';
}

function who() {
    let options = ['large corporate owner', 'local operational team', 'government/police'];
    let rand = Math.floor(Math.random() * options.length)
    return options[rand];
}

function what() {
    let options = ['your identity-linked location tracker', 'your identity-scrubbed location tracker', 'count of people in each aisle'];
    let rand = Math.floor(Math.random() * options.length)
    return options[rand];
}

function why(who) {
    let options = [ 'unknown', 
                    'unknown, but you get real-time personalized coupons for regular purchases or items in your cart',
                    'to investigate a crime'];
    let rand = Math.floor(Math.random() * options.length);
    if (who === 'government/police' && rand == 2) {
        return 'to investigate a crime with a warrant'
    }
    return options[rand];
}

function persistence() {
    let options = ['while you are in the store', 'forever'];
    let rand = Math.floor(Math.random() * options.length);
    return options[rand];
}