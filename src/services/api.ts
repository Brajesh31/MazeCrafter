import axios from 'axios';
import { Maze, LeaderboardEntry } from '../types/maze';

// API base URL - would be replaced with real API endpoint
const API_URL = 'http://localhost:3000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Maze API methods
export const mazeApi = {
  // Get all saved mazes
  getAllMazes: async (): Promise<Maze[]> => {
    try {
      const response = await apiClient.get('/mazes');
      return response.data;
    } catch (error) {
      console.error('Error fetching mazes:', error);
      throw error;
    }
  },

  // Get a specific maze by ID
  getMazeById: async (id: string): Promise<Maze> => {
    try {
      const response = await apiClient.get(`/mazes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching maze ${id}:`, error);
      throw error;
    }
  },

  // Save a new maze
  saveMaze: async (maze: Maze): Promise<Maze> => {
    try {
      const response = await apiClient.post('/mazes', maze);
      return response.data;
    } catch (error) {
      console.error('Error saving maze:', error);
      throw error;
    }
  },

  // Delete a maze
  deleteMaze: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/mazes/${id}`);
    } catch (error) {
      console.error(`Error deleting maze ${id}:`, error);
      throw error;
    }
  },
};

// Leaderboard API methods
export const leaderboardApi = {
  // Get leaderboard entries
  getLeaderboard: async (): Promise<LeaderboardEntry[]> => {
    try {
      const response = await apiClient.get('/leaderboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    }
  },

  // Submit a new score to leaderboard
  submitScore: async (entry: LeaderboardEntry): Promise<LeaderboardEntry> => {
    try {
      const response = await apiClient.post('/leaderboard', entry);
      return response.data;
    } catch (error) {
      console.error('Error submitting score:', error);
      throw error;
    }
  },
};