// /api/routes.ts
import axios from 'axios';

export async function askChatGPT(query: string) {
  const response = await axios.post('http://localhost:5126/AskChatGPT', { query: query });
  return response.data;
}
