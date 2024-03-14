import React, { useState } from 'react'
import Gender from './Gender';
import {Link} from "react-router-dom"
import useSignup from '../../hookz/useSignup';

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName : "",
		username: "",
		password: "",
		confirmedPassword: "",
		gender: ""
	});

	const { loading, signup } = useSignup();

	

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	
	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	}

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> WeChat</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-white label-text'>Full Name</span>
						</label>
						<input type='text' placeholder='Full Name' className='w-full input input-bordered  h-10' value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-white label-text'>Username</span>
						</label>
						<input type='text' placeholder='Username' className='w-full input input-bordered h-10' value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })}/>
					</div>

					<div>
						<label className='label'>
							<span className='text-white label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password} 
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-white label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmedPassword} 
							onChange={(e) => setInputs({ ...inputs, confirmedPassword: e.target.value })}
						/>
					</div>

					<Gender onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>

					<Link to="/login" className='text-sm-black hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-active btn-neutral btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;