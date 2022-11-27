import axios from "axios";

export default async function handler(req, res) {  
    
    // const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/isMember"

    // spring gateway 사용시
    const url = process.env.NEXT_PUBLIC_API_URL + "/auth/api/v1/auth/isMember"

    let data = new Object();
    data.email = req.body.email;

    try {
        const response = await axios.post(url, data);
        res.status(200).json(JSON.stringify(response.data))
    } catch (err) {
        console.log(">> "+JSON.stringify(err));
        res.status(500).end();
    }
}