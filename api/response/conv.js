import axios from "axios";

export default async function handler(req, res) {  
    const query = req.query;
    const { id } = query;

    // const url = process.env.NEXT_PUBLIC_API_URL + `/api/v1/conv`

    // spring gateway 사용시
    const url = process.env.NEXT_PUBLIC_API_URL + '/response/api/v1/response/conversation_analysis'

    let data = new Object();
    data = req.body;

    if (req.method === 'POST') {
        try {
            const response = await axios.post(url, data, {
                headers: {
                    withCredentials: true,
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${req.body.accessToken}`
                }
            });
            res.status(200).json(JSON.stringify(response.data))
        } catch (err) {
            console.log("## error : ")
            console.log(err)
            res.status(500).end();
        }
    } 
}