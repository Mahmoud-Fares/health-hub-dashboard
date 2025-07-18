import { useEffect } from 'react';

import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import api from '@/shared/lib/axios';

import { useAuth } from '@/features/auth/hooks/use-auth';

export default function Login() {
   const navigate = useNavigate();

   const { setIsLoggedIn, isLoggedIn } = useAuth();

   const onFinish = (values: any) => {
      api.post('/api/auth/login', {
         email: values.email,
         password: values.password,
      })
         .then((res) => {
            message.success('You have been successfully logged in.');
            window.localStorage.setItem(
               'token-healthUp-admin',
               res.data.data.token
            );
            setIsLoggedIn(true);
            navigate('/product');
         })
         .catch((err) => {
            message.error(
               'An error occurred while logging in, Please try again.'
            );
            console.log(err);
         });
   };

   useEffect(() => {
      if (isLoggedIn) {
         navigate('/product');
      }
   }, [isLoggedIn, navigate]);

   return (
      <div className='wrapperLogin main'>
         <div className='login'>
            <h1 className='text-xl font-bold text-blue-500'>
               Login | <span>HealthHub Store</span>
            </h1>
            <Form name='loginForm' layout='vertical' onFinish={onFinish}>
               <Form.Item
                  label='Email'
                  name='email'
                  rules={[
                     { required: true, message: 'Please enter your email' },
                     { type: 'email', message: 'Please enter a valid email' },
                  ]}
               >
                  <Input placeholder='admin@example.com' />
               </Form.Item>

               <Form.Item
                  label='Password'
                  name='password'
                  rules={[
                     { required: true, message: 'Please enter your password' },
                  ]}
               >
                  <Input.Password />
               </Form.Item>

               <Form.Item>
                  <Button type='primary' htmlType='submit' block>
                     Login
                  </Button>
               </Form.Item>
            </Form>
         </div>
      </div>
   );
}
