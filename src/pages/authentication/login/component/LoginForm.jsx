import React from 'react';
import useLogin from '../hooks/useLogin';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const { form, isLoading, onSubmit, input } = useLogin();
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <div className="h-screen bg-gradient-to-br from-gray-600 to-indigo-600 flex justify-center items-center w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
        <div className="space-y-4">
          <h1 className="text-center text-2xl font-semibold text-gray-600">Login</h1>
          {input.map((inputField, index) => (
            <div key={index}>
              <label htmlFor={inputField.name} className="block mb-1 text-gray-600 font-semibold">{inputField.label}</label>
              <input
                type={inputField.type}
                id={inputField.name}
                placeholder={inputField.placeholder}
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                {...register(inputField.name)}
              />
              {errors[inputField.name] && (
                <p className="text-red-600 text-sm mt-1">{errors[inputField.name].message}</p>
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 w-full  bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            {/* Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Register</a> */}
            Don't have an account? <Link to={"/signup"} className="text-blue-600 hover:underline">Register</Link>

          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
