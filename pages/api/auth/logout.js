import axios from "axios";

export default async function handler(req, res) {
    
    let token = req.body.accessToken;
    
    // const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/members/logout"

    // spring gateway 사용시
    const url = process.env.NEXT_PUBLIC_API_URL + "/auth/api/v1/auth/logout"

    const data = new Object();

    try {
        const response = await axios.post(url, data, {
            headers: {
                withCredentials: true,
                'Content-Type': "application/json",
                'Authorization': `Bearer ${req.body.accessToken}`
            }
        });

        const setCookie = response.headers['set-cookie']

        let header = [];
        for (const i in setCookie) {
            var split = setCookie[i].split('=');
            header.push(`${split[0]}=${split[1]}; Path=/; HttpOnly`)
        }
        res.setHeader('Set-Cookie', header)

        res.status(200).json(JSON.stringify(response.data))
    } catch (err) {
        console.log("## error : ")
        console.log(err)
        res.status(500).end();
    }
}