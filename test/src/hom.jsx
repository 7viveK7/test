import { useEffect, useState } from "react";
import BasicTable from "./table";
import CustomizedDialogs from "./editModal";
import { useDispatch, useSelector } from "react-redux";
import { setcurrentData, updateData } from "./slice";

const Home = () => {

    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState({})
    const currentData = useSelector((state) => state.counter.data)
    const dispatch = useDispatch()
    // console.log("currentData__", currentData )
    
    useEffect(() => {
        // if (currentData.cou.length === 0) {
            fetch("https://jsonplaceholder.typicode.com/posts")
                .then(response => response.json())
                .then(data => {

                    const evenNum = data.filter((number) => number.id % 2 === 0);
                    console.log({evenNum})
                    dispatch(setcurrentData( evenNum ))
                    // setData(evenNum)
                })
        // }
    }, [])

    const deleteRow = (id) => {
        // console.log(id)
        const newData = data.filter((number) => number.id !== id);
        setData(newData)
    }
    const editRow = (item) => {
        // console.log(item)
        setSelectedRow(item)
        setOpen(true);
    }
    const updateRowData = (item) => {

        const updatedData = data.map((number) => {
            if (number.id === selectedRow.id) {
                return { ...number, ...item };
            }
            return number;
        });
        // setData(updatedData);
        dispatch(updateData({...selectedRow,...item}))
        // console.log(id)

    }

    // console.log(data)
    return (<div style={{ width: "100%", height: "100%", display: "flex",flexDirection:'column', justifyContent: "center", alignItems: "center", }}>
        {/* <h1>Home</h1> */}
        <BasicTable data={currentData} deleteRow={deleteRow} editRow={editRow} />
        <CustomizedDialogs open={open} setOpen={setOpen} updateRowData={updateRowData} item={selectedRow} />
    </div>
    )
}

export default Home;