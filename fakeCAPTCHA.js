//获取当前 JS 文件所在目录
var path = document.querySelectorAll("script")[document.querySelectorAll("script").length - 1].src.slice(0, -14);
//初始化验证器

function CAPTCHA(config) {
    //传递自身
    var self = this;
    //设置验证器状态
    this.checked = false;
    this.config = config
    this.times = 0;
    this.success = false;
    this.clicked = false;

    function end(successs) {
        self.success = successs;
        var checkbox = document.querySelector(config.element + " .captcha-checkbox");
        var spinner = document.querySelector(config.element + " .captcha-spinner");
        var success = document.querySelector(config.element + " .captcha-success");
        var failure = document.querySelector(config.element + " .captcha-failure");
        var text = document.querySelector(config.element + " .captcha-text");
        if (successs) {
            success.style.transform = "scale(1.5)";
            text.innerHTML = "验证成功";

        } else {
            failure.style.transform = "scale(1.5)";
            text.innerHTML = self.config.textAfter;

        }
        spinner.style.opacity = 0;
        self.checked = true;

    };
    //填充验证器元素
    document.querySelector(config.element).classList.add("captcha");
    document.querySelector(config.element).innerHTML = `<div class="captcha-clickable">
        <div class="captcha-checkbox"></div>
        <svg class="captcha-icon captcha-spinner" xmlns="http://www.w3.org/2000/svg" height="24px"
            viewBox="0 -960 960 960" width="24px" fill="#448AFF">
            <path
                d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" />
        </svg>
        <svg class="captcha-icon captcha-success" xmlns="http://www.w3.org/2000/svg" height="24px"
            viewBox="0 -960 960 960" width="24px" fill="#4CAF50">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
        <svg class="captcha-icon captcha-failure" xmlns="http://www.w3.org/2000/svg" height="24px"
            viewBox="0 -960 960 960" width="24px" fill="#F44336">
            <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
        <div class="captcha-text">` + config.textBefore + `</div>
    </div>
    <a class="captcha-mark" href="https://fakecaptcha.netlify.app/" target="_blank">
        <div class="captcha-mark-text">GenCAPTCHA</div>
        <img class="captcha-mark-logo" src="` + path + `fakeCAPTCHA-LOGO.png" alt="fakeCAPTCHA LOGO">
    </a>`;
    //检测深色主题
    if (config.dark) {
        document.querySelector(config.element).classList.add("captcha-dark");
    }
    //绑定点击事件
    document.querySelector(config.element + " .captcha-clickable").onclick = function() {
        //寻找所需元素
        self.clicked = true;
        var checkbox = document.querySelector(config.element + " .captcha-checkbox");
        var spinner = document.querySelector(config.element + " .captcha-spinner");
        var success = document.querySelector(config.element + " .captcha-success");
        var failure = document.querySelector(config.element + " .captcha-failure");
        var text = document.querySelector(config.element + " .captcha-text");
        //避免重复验证
        if (!self.checked) {
            //开始验证过程
            checkbox.style.borderRadius = "50%";
            checkbox.style.transform = "scale(0)";
            checkbox.style.outlineWidth = "4px";
            window.setTimeout(function() {
                spinner.style.opacity = "1";
                text.innerHTML = config.textDuring;
                document.getElementById("captcha-body").style.display = "block";
                nextimg();
            }, 150);
        }
    }



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

    self.maxind = 15; //表示图片范围是1.webp-maxind.webp

    self.answerdb = [];

    function insertimages(slidenum) {
        var arr = getRandomIntegers(1, self.maxind, 9);
        //console.log(randomNumbers);
        for (let i = 1; i < 10; i++) { //indexing at 1 bc I don't feel like going back and renumbering everything
            var atimage = i.toString();
            document.getElementById(atimage).src = "./img/" + arr[i - 1].toString() + ".webp" //imgdata[arrayToGet][i-1]; //big brain moment right there by storing arrays in an array so I can call them by name
        }
    }
    document.querySelector("#pass").onclick = function geniusverified(self) {
        self.success = true;
        for (let i = 1; i < 10; i++) {
            if (true || document.getElementById(i).className === "selected") {
                document.getElementById(i).className = "selected correct";
            }
        }
        setTimeout(function() {
            document.getElementById("captcha-body").style.display = "none";
            end(true);
        }, 1100); // Redirect after 2 seconds if CAPTCHA is correct
    }
    document.querySelector(".verify").onclick = function resetcaptcha(self) {
        self.answerdb = [];
        for (let i = 1; i < 10; i++) {
            if (document.getElementById(i).className === "selected") {
                self.answerdb.push(1); //selected
            } else {
                self.answerdb.push(0); //unselected
            }
        }

        if (arrayEquals(self.answerdb, [0, 0, 0, 0, 0, 0, 0, 0, 0]) == false || true) { //check if answers are correct
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
        self.times = self.times + 1;
        initimg();
        console.log(self.times);
        if (self.times >= 3) {
            document.getElementById("captcha-body").style.display = "none";

            end(false);
        }
    }

    function captchaclick(num) {
        if (document.getElementById(num).className !== "selected" && document.getElementById(num).className !== "selected wrong") {
            document.getElementById(num).className = "selected";
        } else {
            document.getElementById(num).className = "unselected";
        }
    }

    self.place = "none";

    function initimg() {
        insertimages("first");
    }

    function arrayEquals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }
}
