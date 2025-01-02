function getRandomIntegers(a, b, c) {
    if (b - a + 1 < c) {
        throw new Error("Range is smaller than the number of elements to select.");
    }

    var range = [];

    for (let i = a; i <= b; i++) {
        range.push(i);
    }

    // Ëæ»úÑ¡Ôñc¸öÔªËØ
    var result = [];
    while (result.length < c) {
        // Ëæ»úÑ¡ÔñÒ»¸öË÷Òý
        var randomIndex = Math.floor(Math.random() * range.length);
        // ½«Ñ¡ÖÐµÄÔªËØ´Ó·¶Î§Êý×éÖÐÒÆ³ý£¬±ÜÃâÖØ¸´
        result.push(range[randomIndex]);
        range.splice(randomIndex, 1);
    }

    return result;
}

const maxind = 15; //表示图片范围是1.webp-maxind.webp

var answerdb = [];

function insertimages(slidenum) {
    var arr = getRandomIntegers(1, maxind, 9);
    //console.log(randomNumbers);
    for (let i = 1; i < 10; i++) { //indexing at 1 bc I don't feel like going back and renumbering everything
        var atimage = i.toString();
        document.getElementById(atimage).src = "./img/" + arr[i - 1].toString() + ".webp" //imgdata[arrayToGet][i-1]; //big brain moment right there by storing arrays in an array so I can call them by name
    }
}

function resetcaptcha() {
    answerdb = [];
    for (let i = 1; i < 10; i++) {
        if (document.getElementById(i).className === "selected") {
            answerdb.push(1); //selected
        } else {
            answerdb.push(0); //unselected
        }
    }

    if (arrayEquals(answerdb, [0, 0, 0, 0, 0, 0, 0, 0, 0]) == false || true) { //check if answers are correct
        //incorrect
        for (let i = 1; i < 10; i++) {
            if (document.getElementById(i).className === "selected") {
                document.getElementById(i).className = "selected wrong";
            }
        }
        document.getElementsByClassName("try-again")[0].style.display = "block";
        document.getElementsByClassName("verify")[0].disabled = true;
        setTimeout(function() {
            nextimg();
            document.getElementsByClassName("verify")[0].disabled = false;
        }, 800);

    } else {
        for (let i = 1; i < 10; i++) {
            if (document.getElementById(i).className === "selected") {
                document.getElementById(i).className = "selected correct";
            }
        }
        setTimeout(function() {
            redirectToLink()
        }, 1100); // Redirect after 2 seconds if CAPTCHA is correct
    }
}

function redirectToLink() {
    location.assign(window.location.href);
}

function openSpecificPopup() {
    var width = 357;
    var height = 330;
    var leftPosition = (window.screen.width / 2) - (width / 2);
    var topPosition = (window.screen.height / 2) - (height / 2);
    window.open('https://eterill.us.kg/', 'popup', 'width=' + width + ',height=' + height + ',top=' + topPosition + ',left=' + leftPosition);
}

function nextimg() {
    for (let i = 1; i < 10; i++) {
        document.getElementById(i).className = "unselected";

    }
    initimg();
}

function captchaclick(num) {
    if (document.getElementById(num).className !== "selected" && document.getElementById(num).className !== "selected wrong") {
        document.getElementById(num).className = "selected";
    } else {
        document.getElementById(num).className = "unselected";
    }
}

var place = "none";

function initimg() {
    insertimages("first");
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}