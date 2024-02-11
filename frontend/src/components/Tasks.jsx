import React, { useEffect } from "react";
import {
  useDeleteTaskMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
} from "../redux/taskSlice/taskApi";
import { message } from "antd";
import Loading from "./Loading";

const Tasks = ({ open, setOpen }) => {
  const { data, isLoading, isError, refetch } = useGetTaskQuery({});
  const [updateTask, { isLoading: isLoading2, isError: isError2, isSuccess }] =
    useUpdateTaskMutation();
  const [
    deleteTask,
    { isLoading: isLoading3, isError: isError3, isSuccess: isSuccess2 },
  ] = useDeleteTaskMutation();

  const handleUpdate = async (task) => {
    await updateTask({
      id: task.id,
      completed: task.completed === 0 ? 1 : 0,
    });
  };
  const handleDelete = async (id) => {
    await deleteTask(id);
  };

  useEffect(() => {
    if (isError || isError2 || isError3) {
      message.error("Error getting tasks");
    }
  }, [isError, isError2, isError3]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      message.success("Task updated successfully");
    }
  }, [isSuccess, refetch]);

  useEffect(() => {
    if (isSuccess2) {
      refetch();
      message.success("Task deleted successfully");
    }
  }, [isSuccess2, refetch]);

  if (isLoading || isLoading2 || isLoading3) {
    return <Loading />;
  }

  return (
    <>
      <p className="text-center font-semibold text-2xl p-2">All Tasks</p>
      <div className="flex items-center justify-end">
        <button
          onClick={() => setOpen(!open)}
          className="border border-green-500 py-1 px-3 rounded hover:bg-green-500 hover:text-white m-3"
        >
          Add Task
        </button>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3 p-3">
        {data?.tasks?.map((task) => (
          <div
            key={task.id}
            className="shadow rounded flex-col border border-gray-500 p-2 gap-3 hover:shadow-lg transition duration-300"
          >
            <div className="flex flex-col items-start mb-2.5 text-xl">
              <p className="text-blue-500 capitalize">Title: {task.title}</p>
              <p className="text-yellow-500">Description: {task.description}</p>
              <p
                className={`${
                  task.completed === 1 ? "text-green-500" : "text-orange-500"
                }`}
              >
                Completed: {task.completed === 1 ? "Yes" : "No"}
              </p>
            </div>
            <div className="flex items-center transition-all delay-200 justify-center gap-3 ">
              <button
                className={`m-auto block py-1 border px-4 hover:text-white rounded ${
                  task.completed === 0
                    ? "border-green-500 hover:bg-green-500 "
                    : "border-orange-500 hover:bg-orange-500"
                }`}
                onClick={() => handleUpdate(task)}
              >
                Change Status
              </button>
              <button
                className={`m-auto block py-1 border hover:bg-red-500 hover:text-white px-4 rounded`}
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tasks;
