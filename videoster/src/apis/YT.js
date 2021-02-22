import axios from 'axios';

const KEY = 'AIzaSyAgnnwHjqsxd0u1HdlRXQyLmZ5wDznKOhM';
const MY_KEY = 'AIzaSyA1KurVPfdRyRJfcs3820IoIAALjJPE-VY';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: KEY
  }
});