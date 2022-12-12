import axios from "axios";

export default async function handler(req, res) {  
    const query = req.query;
    const { svyId } = query;

    // const url = process.env.NEXT_PUBLIC_API_URL + `/api/v1/surveys/${id}/resp`

    // spring gateway 사용시
    const url = process.env.NEXT_PUBLIC_API_URL + `/response/api/v1/response/all/${svyId}`
    const urlgetSvyInfo = process.env.NEXT_PUBLIC_API_URL + `/survey/api/v1/surveys/${svyId}`
    const urlgetSvyResp = process.env.NEXT_PUBLIC_API_URL + `/response/api/v1/response/all/${svyId}`

    let data = new Object();

    if (req.method === 'GET') {
        let token = req.headers.accesstoken;
        try {
            let resp = await axios.get(urlgetSvyInfo, {
                headers: {
                    withCredentials: true,
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })
            let response = await axios.get(urlgetSvyResp, {
                headers: {
                    withCredentials: true,
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })

            let svyResps = [];
            response.data.map((items, id) => {
                items.svyRespContent.map((item, qId) => {
                    svyResps.svyRespDt = items.svyRespDt
                    svyResps.push(item)
                })
            })


            data.svyId = resp.data.id;
            data.svyRespMax = resp.data.svyRespMax;
            data.svyRespCount = resp.data.svyRespCount;
            data.svyType = resp.data.svyType;
            data.svyRespContent = svyResps;

            res.status(200).send(data)
        } catch (err) {
            console.log("## error : ")
            console.log(err)
            res.status(500).end();
        }
    } 
}