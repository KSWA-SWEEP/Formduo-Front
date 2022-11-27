import axios from "axios";

export default async function handler(req, res) {
    const data = new Object();
    data.email = req.body.email;
    data.password = req.body.password;
    // const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/login"

    // spring gateway 사용시
    const url = process.env.NEXT_PUBLIC_API_URL + "/auth/api/v1/auth/login"

    try {
        const response = await axios.post(url, data);

        const setCookie = response.headers['set-cookie']

        let header = [''];
        for (const i in setCookie) {
            var split = setCookie[i].split('=');
            header.push(`${split[0]}=${split[1]}; Path=/; Secure; SameSite=None; HttpOnly`)
        }
        res.setHeader('Set-Cookie', header)

        res.status(200).json(JSON.stringify(response.data))
    } catch (err) {
        console.log(">> "+JSON.stringify(err));
        res.status(500).end();
    }
}