import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API_URL = "http://127.0.0.1:3001"; // Assurez-vous de remplacer cette URL par la vôtre

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/projects`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const postProject = createAsyncThunk(
  "project/postProject",
  async (newProject) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/projects`, newProject);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (updatedProject) => {
    try {
      const response = await axios.put(
        `${BASE_API_URL}/projects/${updatedProject.id}`,
        updatedProject
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (projectId) => {
    try {
      await axios.delete(`${BASE_API_URL}/projects/${projectId}`);
      return projectId;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "project/fetchProjectById",
  async (projectId) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/projects/${projectId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
    });
    builder.addCase(postProject.fulfilled, (state, action) => {
      state.projects.push(action.payload);
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    });
    builder.addCase(fetchProjectById.fulfilled, (state, action) => {
      state.selectedProject = action.payload;
    });
  },
});

export default projectSlice.reducer;
