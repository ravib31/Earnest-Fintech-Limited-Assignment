import React, { useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { Watermark } from "antd";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <Watermark content={"Created By Ravi Bhashkar"} className="h-screen">
      <AddTask open={open} setOpen={setOpen} />
      <Tasks open={open} setOpen={setOpen} />
    </Watermark>
  );
}

export default App;
