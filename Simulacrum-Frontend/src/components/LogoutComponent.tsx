import { Button} from '@chakra-ui/react';

function LogoutComponent() {
    
    


    return (
        <Button 
        //   onClick = {}
          fontSize='24px'
          fontWeight="extrabold"
          color = "black"
          w='25%'
          bg='#E83C4B'
          borderRadius='20'
          boxShadow='inner'
          variant='solid'
          _hover={{ bg: '#dcf4f6' }}>
              Log out
          </Button>
    )
}

export default LogoutComponent;