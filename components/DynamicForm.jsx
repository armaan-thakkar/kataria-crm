'use client'; // required if you're using Next.js app router

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function DynamicForm() {
  const [selectedForm, setSelectedForm] = useState('');

  // Validation Schemas
  const personalSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    dob: Yup.date().required('Date of birth is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const businessSchema = Yup.object().shape({
    companyName: Yup.string().required('Company name is required'),
    gstNumber: Yup.string().required('GST Number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  // Initial Values
  const initialValues = {
    fullName: '',
    dob: '',
    email: '',
    companyName: '',
    gstNumber: '',
  };

  // Handle form submit
  const handleSubmit = (values) => {
    console.log('Submitted values:', values);
    alert('Form submitted. Check console for values.');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h4>Select Form Type</h4>

      <label>
        <input
          type="radio"
          name="formType"
          value="personal"
          checked={selectedForm === 'personal'}
          onChange={() => setSelectedForm('personal')}
        />
        Personal
      </label>

      <label style={{ marginLeft: '20px' }}>
        <input
          type="radio"
          name="formType"
          value="business"
          checked={selectedForm === 'business'}
          onChange={() => setSelectedForm('business')}
        />
        Business
      </label>

      <div style={{ marginTop: '30px' }}>
        {selectedForm && (
          <Formik
            initialValues={initialValues}
            validationSchema={selectedForm === 'personal' ? personalSchema : businessSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                {selectedForm === 'personal' && (
                  <>
                    <div>
                      <label>Full Name</label><br />
                      <Field name="fullName" type="text" />
                      <div style={{ color: 'red' }}><ErrorMessage name="fullName" /></div>
                    </div>

                    <div>
                      <label>Date of Birth</label><br />
                      <Field name="dob" type="date" />
                      <div style={{ color: 'red' }}><ErrorMessage name="dob" /></div>
                    </div>

                    <div>
                      <label>Email</label><br />
                      <Field name="email" type="email" />
                      <div style={{ color: 'red' }}><ErrorMessage name="email" /></div>
                    </div>
                  </>
                )}

                {selectedForm === 'business' && (
                  <>
                    <div>
                      <label>Company Name</label><br />
                      <Field name="companyName" type="text" />
                      <div style={{ color: 'red' }}><ErrorMessage name="companyName" /></div>
                    </div>

                    <div>
                      <label>GST Number</label><br />
                      <Field name="gstNumber" type="text" />
                      <div style={{ color: 'red' }}><ErrorMessage name="gstNumber" /></div>
                    </div>

                    <div>
                      <label>Email</label><br />
                      <Field name="email" type="email" />
                      <div style={{ color: 'red' }}><ErrorMessage name="email" /></div>
                    </div>
                  </>
                )}

                <button type="submit" style={{ marginTop: '20px' }}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}
