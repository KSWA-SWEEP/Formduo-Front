import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router'

import { Stack, Pagination } from "@mui/material";
// import IndividualData from "../component/IndividualData";
import { useState, useEffect } from "react";

const ResponseTable = (props) => {
    const LAST_PAGE = props.contents.length % 10 === 0 ?
        props.contents.length / 10 : props.contents.length / 10 + 1; // 마지막 페이지

    const router = useRouter();
    const [page, setPage] = useState(1); // 처음 페이지는 1이다.
    const [data, setData] = useState(null);

    // console.log(contents);

    useEffect(() => {
        // setData(/* fetch(또는 전체 데이터에서 slice)로 현재 page의 데이터를 가져온다. */);
        // 한 페이지에 5개씩 보여준다.
        if(page === LAST_PAGE){ // 마지막 페이지는 데이터가 5개보다 부족할 수도 있다.
            setData(props.contents.slice(10 * (page - 1)));
        } else {
            setData(props.contents.slice(10 * (page - 1), 10 * (page - 1) + 10));
        }
    }, [page]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }

    if (!data) return <p>Loading...</p>

    return (
        <Stack alignItems="center">

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1100 }} aria-label="simple table">
                    <TableHead className='bg-fdyellowbright'>
                        <TableRow>
                            <TableCell align="center">NO</TableCell>
                            <TableCell align="center">작성일</TableCell>
                            <TableCell align="center">내용</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {row.id}
                                </TableCell>

                                <TableCell align="center">{row.date.substring(0, 10) + " " + row.date.substring(11, 16)}</TableCell>
                                <TableCell align="center">
                                    {
                                        props.svyType !== "duo" 
                                        ? 
                                        <button onClick={() =>
                                            router.push({pathname : '/survey/preview/basic',
    
                                                            query: {svyId: props.surveyId, svyResId: row.svyResId, svyResContents: JSON.stringify(row.svyRespContent), preURL : '/survey/result/'+props.surveyId},
    
                                                            }, '/survey/preview/basic/'+row.svyResId)}
                                                className="inline-flex items-center justify-center px-3 py-2 ml-8 text-sm font-normal text-white duration-200 border border-transparent rounded-md shadow-sm whitespace-nowrap bg-neutral-400 hover:bg-neutral-600 hover:scale-105">
                                            확인 </button>
                                        : 
                                        <button onClick={() =>
                                            router.push({pathname : '/survey/preview/duo',
    
                                                            query: {svyId: props.surveyId, svyResId: row.svyResId, svyResContents: JSON.stringify(row.svyRespContent), preURL : '/survey/result/'+props.surveyId},
    
                                                            }, 'survey/preview/duo/'+row.svyResId)}
                                                            className="inline-flex items-center justify-center px-3 py-2 ml-8 text-sm font-normal text-white duration-200 border border-transparent rounded-md shadow-sm whitespace-nowrap bg-neutral-400 hover:bg-neutral-600 hover:scale-105">
                                            확인 </button>
                                    }
                                    {/* <button onClick={() =>
                                        router.push({pathname : '/survey/preview/basic',

                                                        query: {svyId: props.surveyId, svyResId: row.svyResId, svyResContents: JSON.stringify(row.svyRespContent), preURL : '/survey/result/'+props.surveyId},

                                                        })}
                                            className="inline-flex items-center justify-center px-3 py-2 ml-8 text-sm font-normal text-white duration-200 border border-transparent rounded-md shadow-sm whitespace-nowrap bg-fdblue hover:bg-fdbluedark hover:scale-105">
                                        확인 </button> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={LAST_PAGE} defaultPage={1} boundaryCount={2}
                        size="large" sx={{margin: 2}} onChange={(e) => handlePage(e)}
                        className="inline-flex items-center justify-center px-3 py-2 ml-8 text-sm font-normal text-white duration-200 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:scale-105"/>
        </Stack>
    );
};

export default ResponseTable;