import axios from 'axios';
import react, { useEffect, useState } from 'react';
import { APIResponse } from '../types/responses/APIResponse';
import { TestFEGETResponse } from '../types/responses/TestFEGETResponse';
import { CircularProgress } from '@chakra-ui/react'

function ExampleGETAPIRequestComponent() {
    const [response, setResponse] = useState<APIResponse<TestFEGETResponse>>({
        loading: true,
        error: false,
        data: null
    });

    useEffect(() => {
        setTimeout(() => {
            axios.get<TestFEGETResponse>('https://simulacrum-api.azurewebsites.net/api/Sandbox/TestFEGET').then((res) => {
                setResponse({ loading: false, error: false, data: res.data });
            }).catch(() => {
                setResponse({ loading: false, error: true, data: null })
            })
        }, 2000);
    }, [])

    if (response.error) {
        return (
            <p>Error occurred</p>
        )
    }

    return (
        <div>
            {response.loading ? (
                <CircularProgress isIndeterminate color='green.300' />
            ) : (
                <div>
                    <p>Number: {response.data?.number}</p>
                    <p>Text: {response.data?.text}</p>
                    <p>Numbers: {response.data?.numbers}</p>
                </div>
            )}
        </div>
    )
}

export default ExampleGETAPIRequestComponent;