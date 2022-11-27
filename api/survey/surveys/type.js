import axios from "axios";

export default async function handler(req, res) {  
    
    // const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/surveys/type"

    // spring gateway 사용시
    const url = process.env.NEXT_PUBLIC_API_URL + "/survey/api/v1/surveys/type"

    let data = new Object();

    if (req.method === 'GET') {
        const query = req.query;
        const { type } = query;

        let token = req.headers.accesstoken;
        try {
            const response = await axios.get(url+"?type="+type, {
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