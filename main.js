var config = {
    element: "#captcha",
    textBefore: "点击进行入机身份验证",
    textDuring: "正在验证，请稍等...",
    textAfter: "未通过验证,您可能是入机。",
    duration: Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000,
    success: false,
    dark: false
};
var isad = true;
// 初始化假验证码
var captcha = new CAPTCHA(config);

// 获取跳转按钮
var redirectButton = document.getElementById('redirectButton');

// 处理跳转按钮点击事件
function handleRedirect() {
    if (captcha.success) {
        location.assign("http://110.42.103.200:19652/");
    } else {
        if (captcha.checked) {
            if (isad) {
                dududadududa();
                isad = false;
            } else {
                location.reload(); // 刷新页面
            }
        } else {
            // 验证失败，不进行跳转
            //var result= confirm("请通过验证码验证！");


            $.confirm({
                title: '提示!',
                content: '请通过验证码验证！',
                type: 'blue',
                boxWidth: '350px',
                useBootstrap: false,
                buttons: {
                    confirm: {
                        text: '确定',
                        btnClass: 'btn-blue',
                        keys: ['enter', 'shift'],
                        action: function() {
                            dududadududa();
                        }
                    }
                }
            });

        }
    }
}

// 定期轮询验证码状态
function checkCaptchaStatus() {
    if (captcha.checked) {
        // 验证成功，更新按钮状态
        redirectButton.disabled = false;
        redirectButton.style.backgroundColor = "#2979FF";
        if (captcha.success) {
            redirectButton.textContent = "点击跳转";
        } else {
            redirectButton.textContent = "刷新页面";
        }
    } else {
        // 验证失败，保持按钮禁用
        redirectButton.disabled = true;
        redirectButton.style.backgroundColor = "#9E9E9E";
        if (captcha.clicked) {
            redirectButton.textContent = "验证中...";
        } else {
            redirectButton.textContent = "请先进行验证";
        }
    }
}

// 每秒检查一次验证码状态
setInterval(checkCaptchaStatus, 500);

function dududadududa() {
    $.dialog({
        title: '骷髅打金服，上线就送VIP!',
        content: '<a href="http://eterill.us.kg/"><img src="./fakeAD.webp"></img></a>',
        type: 'green',
        boxWidth: '350px',
        useBootstrap: false,
        animation: 'zoom',
        closeAnimation: 'zoom',
        animationBounce: 1.5
    });
}
setInterval(dududadududa, Math.floor(Math.random() * (20000 - 10000 + 1)) + 15000);