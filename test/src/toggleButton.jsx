import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonUsage({color,setColor}) {

    const handleColor=()=>{
        if(color==='lavender'){
         
        setColor("beige")
    }
    else{
        setColor("lavender")
    }
}

  return <Button variant="contained" style={{position:'absolute',top:"30px",right:10}} onClick={handleColor}>Toggele Button</Button>;
}
