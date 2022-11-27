import axios from "axios";

export default async function handler(req, res) {  
    
    // const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/members"

    // spring gateway 사용시
    const url = process.env.NEXT_PUBLIC_API_URL + "/auth/api/v1/auth/changePw"

    let data = new Object();

    if (req.method === 'PUT') {
        data = req.body;
        try {
            const response = await axios.put(url, data, {
                headers: {
                    withCredentials: true,
                    'Content-Type': "application/json"
                }
            });
            res.status(200).json(JSON.stringify(response.data))
        } catch (err) {
            console.log(">> "+JSON.stringify(err));
            res.status(500).end();
        }
    } 
}