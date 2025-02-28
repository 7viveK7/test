import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import { deleteData, sortingData } from './slice';


export default function BasicTable({data,editRow}) {

    const TableColoms= data[0] &&  Object.keys(data[0] ) ||[] 
    const [order,setOrder]=React.useState('asc')
   const dispatch = useDispatch()

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
           {TableColoms?.map((name)=>{
            if(name==='id'){
                return <TableCell  >
                    <button onClick={()=>{
                        setOrder(order==='asc'?'desc':'asc')
                        dispatch(sortingData(order==='asc'?'desc':'asc'))}}> Id</button></TableCell>
            }
            return <TableCell >{name}</TableCell>
           }) }
            <TableCell>Delete</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>

        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
              <TableCell align="right">{row.userId}</TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.body}</TableCell>   
              <TableCell align="right"><button onClick={()=>{dispatch(deleteData(row.id))}} >Delete</button></TableCell>      
              <TableCell align="right"><button onClick={()=>{editRow(row)}} >Edit</button></TableCell>        
  
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
