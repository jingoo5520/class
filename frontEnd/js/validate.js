// 회원가입 버튼을 아래의 조건에 따라 유효성 검사를 하고
// 유효하면 1-1_sub.html 페이지로 데이터를 전송하라
// *: 필수항목

// 아이디(*): 4 ~ 8 자 이하(소문자로 저장)
// 비밀번호(*): 4자 이상 12자 이하
// 이메일(*): 이메일 주소 형식
// 휴대폰 번호(*): 전화번호 형식 검사
// 성별(*): 남성 or 여성 반드시 하나 체크
// 취미: 여러개 선택 가능
// 직업(*): 반드시 하나를 선택
// 메모: 가입인사 등 입력
// 가입 조항 동의(*): 반드시 체크되어야 가입 가능

// 가입하기, 유효성 검사
function registerValid() {
    let valid = false;

    // 유효성 검사 통과 후 true
    // 아이디 검사
    let idCheck = validUserId($("#userId").val());
    let pwdCheck = validPwd($("#pwd1").val(), $("#pwd2").val());
    let emailCheck = validEmail($("#email").val());
    let mobileCheck = validMobile($("#mobile").val());
    let genderCheck = validGender();
    let hobby = getHobby();
    let job = getJob();
    let memo = getMemo();

    let isAgree = document.getElementById("agree").checked;
    if (!isAgree) {
        outputError("가입 조항에 동의해주세요.", $("#agree-area"));
    }

    if (
        idCheck &&
        pwdCheck &&
        emailCheck &&
        mobileCheck &&
        genderCheck &&
        job &&
        isAgree
    ) {
        valid = true;
    }

    return valid;
    // return vaild;
}

function validUserId(userId) {
    let isCheck = false;

    if (userId === "") {
        // 에러 메세지 출력
        outputError("아이디는 필수항목입니다.", $("#userId"));
    } else if (userId.length <= 3 || userId.length > 8) {
        outputError("아이디는 4자 이상 8자 이하로 입력해주세요.", $("#userId"));
    } else {
        console.log("idChecked!");
        isCheck = true;
    }

    return isCheck;
}

function validPwd(pwd1, pwd2) {
    let isCheck = false;
    if (pwd1 === "") {
        outputError("비밀번호는 필수항목입니다.", $("#pwd1"));
    } else if (pwd1 != pwd2) {
        outputError("비밀번호가 일치하지 않습니다.", $("#pwd1"));
    } else if (pwd1.length <= 3 || pwd1.length > 12) {
        outputError("비밀번호는 4자 이상 12자 이하로 입력하세요.", $("#pwd1"));
    } else {
        console.log("pwdChecked!");
        isCheck = true;
    }
    return isCheck;
}

function validEmail(email) {
    let isCheck = false;

    let emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

    if (!emailRegExp.test(email)) {
        outputError("이메일 형식이 아닙니다.", $("#email"));
    } else {
        isCheck = true;
    }

    return isCheck;
}

function validMobile(mobile) {
    let isCheck = false;

    let mobileRegExp = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

    if (!mobileRegExp.test(mobile)) {
        outputError("휴대폰 번호 형식이 아닙니다.", $("#mobile"));
    } else {
        isCheck = true;
    }

    return isCheck;
}

function validGender(gender) {
    let isCheck = false;

    let radio1 = false;
    let radio2 = false;

    if (document.getElementsByName("gender")[0].checked) {
        radio1 = true;
    }
    if (document.getElementsByName("gender")[1].checked) {
        radio2 = true;
    }

    // 아무것도 선택되지 않았을 때
    if (radio1 == false && radio2 == false) {
        outputError("성별 선택은 필수입니다.", $("#gender-field"));
    } else {
        isCheck = true;
    }

    return isCheck;
}

function getHobby() {
    let hobbies = "";
    let hobbyArray = document.getElementsByName("hobby");

    for (hobby of hobbyArray) {
        if (hobby.checked) {
            // console.log(hobby.value);
            hobbies += `${hobby.value},`;
        }
    }

    // 가장 마지막 콤마 제거
    console.log(hobbies.slice(0, -1));
    // 콤마제거 2
    // hobbies.substring(0, hobbies.length -1);
    return hobbies.slice(0, -1);
}

function getJob() {
    let isCheck = false;

    let value = document.getElementById("job").value;
    // document.getElementById("job").selectedIndex; 로도 사용 가능

    if (value == "--직업 선택--") {
        outputError("직업을 선택해 주세요.", $("#job"));
    } else {
        isCheck = true;
    }

    return isCheck;
}

function getMemo() {
    let memo = document.getElementById("memo").value;

    return memo;
}

function outputError(errMsg, tagObj) {
    // errorMsg에 tagObj 객체 다음 요소에 삽입시켜 출력
    let err = `<div class="errMsg">
                ${errMsg}
                    </div>`;

    $(err).insertAfter($(tagObj));
    $(".errMsg").hide(4000);
}
