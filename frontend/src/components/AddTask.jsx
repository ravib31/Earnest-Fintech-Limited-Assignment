import { Drawer, Form, Input, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  useAddTaskMutation,
  useGetTaskQuery,
} from "../redux/taskSlice/taskApi";
import Loading from "./Loading";

const AddTask = ({ open, setOpen }) => {
  const { refetch } = useGetTaskQuery({});
  const [createTask, { isError, isSuccess, isLoading }] = useAddTaskMutation();

  const [tasks, setTasks] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const handleSave = async () => {
    if (tasks.title === "" || tasks.description === "") {
      return message.error("Please fill all the fields");
    }
    await createTask(tasks);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      message.success("Task added successfully");
    }
    if (isError) {
      message.error("Error adding task");
    }
  }, [isError, isSuccess, refetch, setOpen]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Drawer
      closable
      title={<span className="text-xl font-bold">Create New Task</span>}
      onClose={() => setOpen(false)}
      footer={false}
      open={open}
    >
      <Form
        className="flex items-start justify-between flex-col h-full"
        onFinish={handleSave}
        onFinishFailed={() => {}}
      >
        <div className="w-full">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input
              value={tasks.title}
              onChange={(e) => setTasks({ ...tasks, title: e.target.value })}
              placeholder="Title"
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input.TextArea
              value={tasks.description}
              onChange={(e) =>
                setTasks({ ...tasks, description: e.target.value })
              }
              rows={4}
              placeholder="Description"
            />
          </Form.Item>
          <Form.Item
            label="Completed"
            name="completed"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Select
              allowClear
              placeholder="Completed"
              value={tasks.completed}
              onChange={(value) => setTasks({ ...tasks, completed: value })}
              options={[
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ]}
            />
          </Form.Item>
        </div>
        <Form.Item className="flex w-full items-center justify-end">
          <button
            onClick={() => setOpen(false)}
            className="rounded bg-gray-200 py-2 px-5 mx-3 text-xs shadow"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            htmlType="submit"
            className="rounded border border-[#17B14A] bg-[#17B14A] py-2 px-5 text-xs text-white shadow"
          >
            Save
          </button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddTask;
