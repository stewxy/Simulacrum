import axios from "axios";
import HeaderComponent from "../components/HeaderComponent";
import react, { useEffect, useState } from 'react';
import UpdateProfileComponent from "../components/UpdateProfileComponent";
import { APIResponse } from "../types/responses/APIResponse";
import { ProfileResponse } from "../types/responses/ProfileResponse";
import SpinnerComponent from "../components/SpinnerComponent";
import { Box} from "@chakra-ui/react";


function UpdateProfileView(){

    const [response, setResponse] = useState<APIResponse<ProfileResponse>>({
      loading: true,
      error: false,
      data: null,
    });
  
    useEffect(() => {
      setTimeout(() => {
        axios
          .get<ProfileResponse>(
            'https://simulacrum-api.azurewebsites.net/api/Profile/GetProfileOverview'
          )
          .then((res) => {
            setResponse({ loading: false, error: false, data: res.data });
            console.log(res.data);
          })
          .catch(() => {
            setResponse({ loading: false, error: true, data: null });
          });
      }, 500);
    }, []);

    if (response.error) {
      return <p>Error occurred</p>;
    } else if (response.data != null) {
        return (
            <>
                <HeaderComponent headerName={"Update Profile"} />
                <UpdateProfileComponent 
                    firstName={response.data.firstName}
                    lastName={response.data.lastName}
                    email={response.data.email}
                    userProfilePic={response.data.profilePicFileURL}
                    interestTags={response.data.skills}
                    gitHubURL={response.data.gitHubURL}
                    discordURL={response.data.discordURL}
                ></UpdateProfileComponent>
                <Box h="200px"></Box>
            </>
        )
    }
    else{
      return(
        <>
          <HeaderComponent headerName={"Update Profile"} />
          <SpinnerComponent></SpinnerComponent>
          <Box mb='250px'></Box>
        </>
      )
    }
}
    

export default UpdateProfileView;