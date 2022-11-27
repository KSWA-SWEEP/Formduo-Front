import axios from "axios";

export default async function handler(req, res) {
    const data = new Object();
    data.email = req.body.email;
    data.password = req.body.password;
    data.username = req.body.username;
    // const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/signup"

    // spring gateway 사용시
    const url = process.env.NEXT_PUBLIC_API_URL + "/auth/api/v1/auth/signup"

    try {
        const response = await axios.post(url, data);
        console.log(response);
        res.status(200).json(JSON.stringify(response.data))
    } catch (err) {
        console.log(">> err");
        console.log(JSON.stringify(err));
        res.status(500).end();
    }
}