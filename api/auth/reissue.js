import axios from "axios";
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import Cookies from 'cookies'   

export default async function handler(req, res) {
    const data = new Object();

    let token = req.body.token;
    const isLogin = req.body.isLogin;
    const expTime = req.body.expTime;

    // Get a cookie
    const cookies = new Cookies(req, res)
    let refreshToken = cookies.get('refresh_token')

    // 현재 시간
    const today = new Date()
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2);

    const now = year + '-' + month  + '-' + day+'T'+ hours + ':' + minutes  + ':' + seconds;

    // token 값이 비어있거나 만료 시간이 지났으면, reissue
    if(token == "" || token == "undefined" || now > expTime){
        if(isLogin == "true"){
            // const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/reissue"

            // spring gateway 사용시
            const url = process.env.NEXT_PUBLIC_API_URL + "/auth/api/v1/auth/reissue"

            try {
                const data = new Object();
                data.refreshToken = refreshToken;
                console.log("===================")
                console.log(data)
                const response = await axios.post(url, data);
                
                res.status(200).json(JSON.stringify(response.data));
            } catch (err) {
                console.log(">> err");
                console.log(err);
                res.status(500).end();
            }
        } else {
            console.log(">> err");
            console.log(err);
            res.status(500).end();
        }
    } else {
        let data = {
            accessToken : token,
            isLogin : isLogin,
            expTime : expTime
        };
        res.status(200).json(JSON.stringify(data));
    }

}