import Router, { useRouter } from "next/router";

async function checkAccessToken(token) {
    let acctoken = token
    let isLogin = sessionStorage.getItem("isLogin")
    let expTime = sessionStorage.getItem("expTime")

    // 현재 시간
    const today = new Date()
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2);

    const now = year + '-' + month  + '-' + day+'T'+ hours + ':' + minutes  + ':' + seconds;
    // console.log("now : " + now + "  exp : " + getCookie("expTime").split('.')[0])
    // console.log(now < getCookie("expTime"))
    
    //token 값이 비어있거나 만료 시간이 지났으면, reissue
    if(token == "" || token == "undefined" || now > expTime){
        const response = await fetch('/api/auth/reissue', {
            method: 'POST',
            body: JSON.stringify({ token: acctoken, isLogin : sessionStorage.getItem("isLogin"), expTime : sessionStorage.getItem("expTime") }),
            headers: {
                'Content-type': 'application/json',
            }
        });

        // refresh token 만료의 경우 => 로그아웃 후 재로그인 진행
        if(response.status == 500)
        {
            alert("토큰이 만료되었습니다.\n다시 로그인 해주시기 바랍니다.");
            
            const r = await fetch('/api/auth/logout', {
                method: 'POST',
                body: JSON.stringify({}),
                headers: {
                    'Content-type': 'application/json',
                }
            }).then(() => {
                sessionStorage.setItem("isLogin","false")
                sessionStorage.setItem("expTime","")
                Router.push('/');
            });
        } else {
            const data = await response.json();
            let jsonData = JSON.parse(data);

            // 만료 시간 sessionStorage에 저장
            sessionStorage.setItem("expTime",jsonData.expTime);

            return jsonData.accessToken;
        }
        
    }
    return token
}
export default checkAccessToken