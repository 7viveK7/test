import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicTable from "./table";
import CustomizedDialogs from "./editModal";
import {  deleteData, fetchPosts, updateData, } from "./slice";

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
  const { data, loading, error } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDeleteRow = (id) => {
    dispatch(deleteData(id));
  };

  const handleEditRow = (item) => {
    setSelectedRow(item);
    setOpen(true);
  };

  const handleUpdateRowData = (updatedItem) => {
    dispatch(updateData({ ...selectedRow, ...updatedItem }));
    setOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <BasicTable
        data={data}
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