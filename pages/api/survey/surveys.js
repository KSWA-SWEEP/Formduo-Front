import axios from "axios";

export default async function handler(req, res) {  
    
    // const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/surveys"

    // spring gateway 사용시
    const url = process.env.NEXT_PUBLIC_API_URL + "/survey/api/v1/surveys"

    let data = new Object();


    if (req.method === 'POST') {
        try {
            data = req.body
            const response = await axios.post(url, data, {
                headers: {
                    withCredentials: true,
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${req.body.accessToken}`
                }
            });
            res.status(200).json(JSON.stringify(response.data))
        } catch (err) {
            console.log(err)
            res.status(500).end();
        }
    } 
    else if (req.method === 'GET') {
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
    else if (req.method === 'PUT') {
    } 
    else if (req.method === 'DELETE') {

    }
}