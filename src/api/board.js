import api from './index';
import { urlBuilder } from '../utils/url';

export const fetchBoardList = (form = {}) => api.get('/todo/board', form);

export const fetchBoardDetail = (params = {}, data) => api.get(urlBuilder('/todo/board/:boardId', params), data);

export const updateBoard = (params = {}, data) => api.put(urlBuilder('/todo/board/:boardId', params), data);

export const createBoard = form => api.post(urlBuilder('/todo/board'), form);
