function createUUID() {
    return uuidv4().toUpperCase();
}
function getParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
let [curLong, curLat] = [0.0, 0.0];
function getLocation() {
    if (locationEnabled) { 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                curLong = position.coords.longitude;
                curLat = position.coords.latitude;
            });
        }
    }
    else { // disabled
        curLong = 0.0;
        curLat = 0.0;
    }
}

function saveSyntax() {
    let e = document.getElementById('draft-syntax');
    setCookie('syntax', e.value, 365);
}
function readSyntax() {
    let val = getCookie('syntax');
    if (val && val.length > 0) {
        document.getElementById('draft-syntax').value = val;
    }
}

let locationEnabled = false;
function saveLocationEnabled() {
    let e = document.getElementById('draft-location-enabled');
    setCookie('locationenabled', (e.checked ? "1" : "0"), 365);
    getLocation();
}
function readLocationEnabled() {
    let val = getCookie('locationenabled');
    if (val && val == '1') {
        locationEnabled = true
        document.getElementById('draft-location-enabled').checked = true;
    }
}

function redirectIfNeeded() {
    let redir = getParam('redirect');
    if (redir) {
        if (redir == 'back') {
            window.history.back();
        }
        else if (redir == 'url' || redir == '1') {
            let source = getParam('url');
            if (source) {
                document.location = source;
            }
        }
    }
}
function showElement(x) {
    document.getElementById(x).style.display = '';
}
function hideElement(x) {
    document.getElementById(x).style.display = 'none';
}

let startActivity = () => {
    showElement('page-cover');
}
let stopActivity = () => {
    hideElement('page-cover');
}

let createDraft = (content, tags, syntax, isFlagged, completion) => {
    let container = CloudKit.getDefaultContainer();
    let privateDB = container.privateCloudDatabase;

    let options = { zoneID: "drafts" }
    let d = Date.now();
    let device = "Web";
    let uuid = createUUID();
    let flagged = isFlagged ? 1 : 0;

    let record = {
        recordType: "draft",
        recordName: `draft|--|${uuid}`,
        fields: {
            uuid: { value: uuid },
            changed_at: { value: d },
            created_at: { value: d },
            created_device: { value: device },
            created_longitude: { value: curLong },
            created_latitude: { value: curLat },
            modified_at: { value: d },
            modified_device: { value: device },
            modified_longitude: { value: curLong },
            modified_latitude: { value: curLat },
            accessed_at: { value: d },
            flagged: { value: flagged },
            folder: { value: 0 },
            hidden: { value: 0 },
            content: { value: content },
            language_grammar_name: { value: syntax },
            last_selection_length: { value: 0 },
            last_selection_location: { value: 0 },
            tags: { value: tags },
            title: { value: "" }
        }
    };

    return privateDB.saveRecords([record], options)
        .then(function (response) {
            if (response.hasErrors) {
                completion(false, null, response.errors[0]);
            } else {
                var createdRecord = response.records[0];
                completion(true, createdRecord, null);
            }
        });
}

function showSuccess(message) {
    let h = `<div class="alert _success">
        <span class="-close">×</span>
        ${message}
        </div>`;
    document.getElementById('alerts').innerHTML = h; 
    var close = document.getElementsByClassName("-close"),
        i;
    for (i = 0; i < close.length; i++)
        close[i].onclick = function () {
            var a = this.parentElement;
            a.classList.contains("modalbox-modal-content") && (a = a.parentElement);
            a.style.opacity = "0";
            setTimeout(function () {
                a.style.display = "none";
                a.style.opacity = "1"
            }, 600)
        };
}
function showError(message) {
    let h = `<div class="alert _error">
        <span class="-close">×</span>
        ${message}
        </div>`;
    document.getElementById('alerts').innerHTML = h;
    var close = document.getElementsByClassName("-close"),
        i;
    for (i = 0; i < close.length; i++)
        close[i].onclick = function () {
            var a = this.parentElement;
            a.classList.contains("modalbox-modal-content") && (a = a.parentElement);
            a.style.opacity = "0";
            setTimeout(function () {
                a.style.display = "none";
                a.style.opacity = "1"
            }, 600)
        };
}

function clearCaptureForm() {
    document.getElementById('draft-content').value = "";
    document.getElementById('draft-tags').value = "";
}

function postCaptureForm() {
    let content = document.getElementById('draft-content').value;
    let tagsRaw = document.getElementById('draft-tags').value
    let tags = [];
    if (tagsRaw.length > 0) {
        tags = tagsRaw.split(',').map(t => t.trim());
    }
    let syntax = document.getElementById('draft-syntax').value;
    let isFlagged = document.getElementById('draft-flagged').checked;

    if (!content || content.length == 0) {
        showError("Content required");
        return
    }
    startActivity();
    createDraft(content, tags, syntax, isFlagged, function(success, record, error) {
        stopActivity();
        if (success) {      
            let msg = "Draft created"  
            if (record) {
                let fields = record.fields;
                let uuid = fields['uuid'].value;
                let link = `drafts://open?uuid=${uuid}`
                msg = `Draft created: <a href='${link}'>Link</a>`
            }
            showSuccess(msg);
            clearCaptureForm();
            redirectIfNeeded();
        }
        else { // report error
            alert(error);
        }
    });
}

