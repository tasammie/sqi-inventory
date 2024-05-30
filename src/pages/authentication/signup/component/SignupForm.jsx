
import { Link } from 'react-router-dom';
import useSignUp from '../hooks/useSignUp';

const SignupForm = () => {
    const { form, onSubmit, isLoading } = useSignUp();
    const { register, handleSubmit, formState: { errors } } = form;

    return (
        <div className="h-screen bg-gradient-to-br from-gray-900 to-indigo-600 flex justify-center items-center w-full my-2.5">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
                <div className="space-y-4">
                    <h1 className="text-center text-2xl font-semibold text-gray-600">Register</h1>
                    <div>
                        <label htmlFor="firstName" className="block mb-1 text-gray-600 font-semibold">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                            {...register('firstName')}
                        />
                        {errors.firstName && (
                            <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block mb-1 text-gray-600 font-semibold">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                            {...register('lastName')}
                        />
                        {errors.lastName && (
                            <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1 text-gray-600 font-semibold">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 text-gray-600 font-semibold">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                            {...register('password')}
                        />
                        {errors.password && (
                            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
                    disabled={isLoading}
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Already have an account? <Link to={"/"} className="text-blue-600 hover:underline">Login</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;

