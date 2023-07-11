import axios from 'axios';
import React from 'react';
import { Form, redirect, useNavigation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    const response = await axios.post(newsletterUrl, data);
    console.log(response);
    toast.success(response.data.msg);
    return redirect('/');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Newsletter = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Form
      className='form'
      method='POST'
    >
      <h4 style={{ textAlign: 'center', marginBottom: '2em' }}>
        our newsletter
      </h4>
      <div className='form-row'>
        <label
          htmlFor='name'
          className='form-label'
        >
          name
        </label>
        <input
          type='text'
          className='form-input'
          name='name'
          id='name'
          placeholder='John Doe'
          defaultValue='John'
        />
      </div>
      <div className='form-row'>
        <label
          htmlFor='lastName'
          className='form-label'
        >
          last name
        </label>
        <input
          type='text'
          className='form-input'
          name='lastName'
          id='lastName'
          placeholder='John Doe'
          defaultValue='Doe'
        />
      </div>
      <div className='form-row'>
        <label
          htmlFor='email'
          className='form-label'
        >
          email
        </label>
        <input
          type='email'
          className='form-input'
          name='email'
          id='email'
          placeholder='john@xyz.com'
          defaultValue='test@test.com'
        />
      </div>
      <button
        type='submit'
        className='btn btn-block'
        style={{ marginTop: '.5rem' }}
        disabled={isSubmitting}
      >
        {' '}
        {isSubmitting ? 'submitting' : 'submit'}{' '}
      </button>
    </Form>
  );
};

export default Newsletter;
