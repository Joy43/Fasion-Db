import axios from 'axios';

async function test() {
  const url = 'https://fasiondb-server.vercel.app/api/v1/auth/login';
  const payload = {
    email: 'joy@gmail.com',
    password: '12345678',
    fcmToken: 'cm40HLjXRXWMOUSlgaiYGL:APA91bEZaeVqDVj3bmdaTcYbTXxsJ6ZaD5VEybK8j-j4R2xUVeVqzsFXVlHYzYrW8LjMF9yykQ19_Q8w0z6ryz_QQ018cmgIsDtFcbysWpu_JfHtpuRkZgs'
  };

  console.log('Sending request WITH fcmToken...');
  try {
    const response = await axios.post(url, payload);
    console.log('Vercel API Success Response:', response.data);
  } catch (error: any) {
    console.error('Vercel API Failure Response:', error.response?.data || error.message);
  }
}

test().catch(console.error);
