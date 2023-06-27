import { CircularProgress } from "@chakra-ui/react";
import { useState } from "react";
import { APIResponse } from "../types/responses/APIResponse";
import { TestFEPOSTResponse } from "../types/responses/TestFEPOSTResponse";
import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import axios from "axios";
import { TestFEPOSTRequest } from "../types/requests/TestFEPOSTRequest";

function ExamplePOSTAPIRequestComponent() {
    const [response, setResponse] = useState<APIResponse<TestFEPOSTResponse>>({
        loading: false, error: false, data: null
    });

    const [name, setName] = useState<string>('');

    function request() {
        setResponse({ ...response, loading: true });

        setTimeout(() => {
            let req: TestFEPOSTRequest = {
                name: name
            };

            axios.post<TestFEPOSTResponse>('https://simulacrum-api.azurewebsites.net/api/Sandbox/TestFEPOST', req)
                .then((res) => {
                    setResponse({ loading: false, error: false, data: res.data })
                });
        }, 2000);
    }

    if (response.loading) {
        return (
            <CircularProgress isIndeterminate color='blue.300' />
        )
    } else if (response.data) {
        return (
            <>
                <p>{response.data.message}</p>
                <Button colorScheme='blue' onClick={() => { setResponse({ loading: false, error: false, data: null }) }}>Reset</Button>
            </>
        )
    } else {
        return (
            <>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name' />
                <Button onClick={request} colorScheme='blue'>Submit</Button>
            </>
        )
    }
}

export default ExamplePOSTAPIRequestComponent;