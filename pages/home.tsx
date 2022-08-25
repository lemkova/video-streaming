import React from 'react'
import { NextPage,GetServerSideProps } from 'next'
import HomeRouter, { PropsData } from '../components/pages/HomeRouter'
import axios from 'axios'

const MOVIES_ENDPOINT_URL = 'https://www.omdbapi.com/?s=Marvel&apikey=3399d597'

const Page : NextPage<PropsData> = (props: PropsData) => {

    return (
        <HomeRouter data={props.data}/>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await axios.get(MOVIES_ENDPOINT_URL);
    const data = res.data
    return { props: { data } }

}

export default Page