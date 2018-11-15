import api from './index';
import { urlBuilder } from '../utils/url';

export const updateTaskStep = (params = {}, data) => api.put(urlBuilder('/todo/board/:boardId/task/:taskId/step', params), data);

export const updateTask = (params = {}, data) => api.put(urlBuilder('/todo/board/:boardId/task/:taskId', params), data);

export const createTask = (params = {}, data) => api.post(urlBuilder('/todo/board/:boardId/task', params), data);
