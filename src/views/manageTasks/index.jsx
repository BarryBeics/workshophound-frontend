import React, { useEffect, useState, useCallback } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GraphQLClient } from "graphql-request";
import Header from "../../components/Header";
import DeleteTaskModal from "../../components/DeleteTaskModal";
import ThemedDataGrid from "../../components/ThemedDataGrid";
import { graphqlEndpoint } from "../../config";
import TableActions from "../../components/TableActions";

import { READ_ALL_TASKS_QUERY } from "../../graph/tasks/queries";
import { DELETE_TASK_MUTATION } from "../../graph/tasks/mutations";

const client = new GraphQLClient(graphqlEndpoint);


const ManageTasks = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      const data = await client.request(READ_ALL_TASKS_QUERY);
      const filteredTasks = data.readAllTasks
        .filter((task) => !task.projectId) // 👈 Only tasks with no projectId
        .map((task) => ({
          ...task,
          id: task.id,
        }));
      setTasks(filteredTasks);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  }, []);
  

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleOpenDeleteModal = (task) => {
    setSelectedTask(task);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedTask(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTask?.id) return;
    try {
      await client.request(DELETE_TASK_MUTATION, { id: selectedTask.id });
      await fetchTasks();
      handleCloseDeleteModal();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit task with id ${id}`);
    navigate(`/tasks/edit/${id}`);
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "dueDate", headerName: "Due Date", flex: 1 },
    { field: "assignedTo", headerName: "Assigned To", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => (
        <TableActions
        onEdit={() => handleEdit(row.id)}
        onDelete={() => handleOpenDeleteModal(row)}
        hideCreate={true} 
      />
  ),
},
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="TASKS" subtitle="View and Manage Tasks" />
      <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/createTask")}
                >
                  Create Task
                </Button>
              </Box>
              <ThemedDataGrid rows={tasks} columns={columns} />

      <DeleteTaskModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        task={selectedTask}
      />
    </Box>
  );
};

export default ManageTasks;
