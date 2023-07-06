import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const schema = yup.object().shape({
    Email: yup.string().email('Please enter a valid email').required('Email is required'),
    Password: yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
})

const Login = () => {
    const navigate = useNavigate();

    const label = [
        {
            Name: 'Email',
            type: 'email'
        },
        {
            Name: 'Password',
            type: 'password'
        },
    ]
    return (
        <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen text-center'>
            <div className='grid grid-cols-3'>
                <Formik
                    initialValues={{
                        Email: " ",
                        Password: "",
                    }}

                    validationSchema={schema}

                    onSubmit={(val) => {
                        try {
                            axios.post("https://kalikablog.onrender.com/auth/login/", val)
                                .then((res) => {
                                    localStorage.setItem("token", res.data.token)
                                    navigate('/');
                                }).catch(error => {
                                    console.log(error)
                                })
                        } catch (error) {

                            console.log(error)
                        }
                    }}
                >
                    {({ handleSubmit }) => {
                        return (
                            <Form
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                                className='bg-white rounded-lg col-start-2 mt-24'>
                                <span className='text-2xl font-bold m-4'>Login</span> <hr />
                                {label.map((val, i) => {
                                    return (
                                        <div key={i}>
                                            <div>
                                                <Field
                                                    type={val.type}
                                                    name={val.Name}
                                                    placeholder={val.Name}
                                                    className="border-b-2 border-gray-400 pl-2 py-1 mt-7 focus:outline-none shadow-md"
                                                />
                                                <p className='h-1'>
                                                    <ErrorMessage
                                                        component={"div"}
                                                        name={val.Name}
                                                        className='text-red-500 text-sm'
                                                    >
                                                    </ErrorMessage>
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                                <button type='submit' className='bg-[#a855f7] px-4 py-1 m-6 rounded-lg text-white'>Login</button>
                                <div>Don&apos;t Have an Account?</div>
                                <Link to={'/register'} className='text-blue-700'>Register?</Link>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}

export default Login
