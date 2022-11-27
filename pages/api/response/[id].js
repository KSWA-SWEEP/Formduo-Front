import axios from "axios";

export default async function handler(req, res) {  
    const query = req.query;
    const { id } = query;

    // const url = process.env.NEXT_PUBLIC_API_URL + `/api/v1/surveys/${id}/resp`

    // spring gateway 사용시
    const url = process.env.NEXT_PUBLIC_API_URL + `/response/api/v1/response/${id}`

    let data = new Object();

    if (req.method === 'GET') {
        let token = req.headers.accesstoken;
        try {
            const response = await axios.get(url, {
                headers: {
                    withCredentials: true,
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            res.status(200).send(response.data)
        } catch (err) {
            console.log("## error : ")
            console.log(err)
            res.status(500).end();
        }
    } 
}