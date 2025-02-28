import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicTable from "./table";
import CustomizedDialogs from "./editModal";
import { setcurrentData, updateData } from "./slice";

// Define styles as a constant
const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

const Home = () => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const currentData = useSelector((state) => state.counter.data);
  const dispatch = useDispatch();

  // Fetch data on mount
  useEffect(() => {
    if (!currentData.length) {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => {
          const evenNum = data.filter((item) => item.id % 2 === 0);
          dispatch(setcurrentData(evenNum));
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [currentData.length, dispatch]);

  
  const handleDeleteRow = (id) => {
    const newData = currentData.filter((item) => item.id !== id);
    dispatch(setcurrentData(newData));
  };

  const handleEditRow = (item) => {
    setSelectedRow(item);
    setOpen(true);
  };

  const handleUpdateRowData = (updatedItem) => {
    dispatch(updateData({ ...selectedRow, ...updatedItem }));
    setOpen(false);
  };

  return (
    <div style={styles.container}>
      <BasicTable
        data={currentData}
        deleteRow={handleDeleteRow}
        editRow={handleEditRow}
      />
      <CustomizedDialogs
        open={open}
        setOpen={setOpen}
        updateRowData={handleUpdateRowData}
        item={selectedRow}
      />
    </div>
  );
};

export default Home;