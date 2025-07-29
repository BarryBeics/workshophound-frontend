import React, { useEffect, useState, useCallback } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { GraphQLClient } from "graphql-request";
import Header from "../../components/Header";
import DeleteProjectModal from "../../components/DeleteProjectModal";
import TableActions from "../../components/TableActions";
import ThemedDataGrid from "../../components/ThemedDataGrid";
import { graphqlEndpoint } from "../../config";

import { READ_PROJECTS_FILTER_QUERY } from "../../graph/tasks/queries";
import { DELETE_PROJECT_MUTATION } from "../../graph/tasks/mutations";

const client = new GraphQLClient(graphqlEndpoint);

const ManageProjects = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { sop = false, name = "Project" } = location.state || {};

  const [projects, setProjects] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      const data = await client.request(READ_PROJECTS_FILTER_QUERY, { sop });
      const formattedProjects = data.readProjectsFilter.map((project) => ({
        ...project,
        labels: project.labels?.join(", ") || "",
        taskCount: project.tasks?.length || 0,
      }));
      setProjects(formattedProjects);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleOpenDeleteModal = (project) => {
    setSelectedProject(project);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedProject(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProject?.id) return;
    try {
      await client.request(DELETE_PROJECT_MUTATION, { id: selectedProject.id });
      await fetchProjects();
      handleCloseDeleteModal();
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit project with id ${id}`);
    navigate(`/projects/edit/${id}`);
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "assignedTo", headerName: "Assigned To", flex: 1 },
    { field: "dueDate", headerName: "Due Date", flex: 1 },
    { field: "labels", headerName: "Labels", flex: 1 },
    { field: "taskCount", headerName: "Tasks", flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => (
        <TableActions
        onEdit={() => handleEdit(row.id)}
        onDelete={() => handleOpenDeleteModal(row)}
        onCreateTask={() =>
          navigate("/createTask", {
            state: {
              projectId: row.id,
              redirectPath: "/managePrijects", 
            },
          })
        }
        hideCreate={false} 
      />
  ),
},
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="MANAGE PROJECTS" subtitle="Manage All Projects" />
      <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              navigate("/createProject", { state: { sop: false, name: "PROJECT", redirectPath: "/manageProjects" } })
            }
          >
            Create Project
          </Button>
        </Box>
        <ThemedDataGrid rows={projects} columns={columns} />


      <DeleteProjectModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        project={selectedProject}
      />
    </Box>
  );
};

export default ManageProjects;
