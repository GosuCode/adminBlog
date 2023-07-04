import React, { useEffect, useState } from 'react'
import bunny from '../Img/bunny.jpeg'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { RiDeleteBin6Fill } from 'react-icons/ri'

const SinglePost = () => {
    const { id } = useParams();
    const [getData, setGetData] = useState()
    const [deleteBlog, setDeleteBlog] = useState([])

    const navigate = useNavigate();


    useEffect(() => {
        const fetchPostById = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/postById/${id}`);
                if (response.status === 200) {
                    setGetData(response.data);
                } else {
                    console.error(response.data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPostById();
    }, [id]);

    const handleDelete = (_id) => {
        try {

            axios.delete(`http://localhost:3001/posts/${id}`).then(res => {
                navigate('/');
                if (res.status === 200) {
                    setDeleteBlog(!deleteBlog);
                    console.log("Data Gone Boy!!")
                }
            });
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='p-4'>
            <div className='w-full shadow-sm shadow-gray-300 border border-gray-300'>
                {getData ? (
                    <div className='w-full'>
                        <div className='h-[280px] w-full bg-lime-500'
                            style={{
                                backgroundImage: `url(${bunny})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }} />
                        <div onClick={() => handleDelete(getData.id)}>
                            <RiDeleteBin6Fill className='text-red-600' />
                        </div>
                        <div className='px-3 py-3'>
                            <div className='mb-1'><span>{getData.subtitle}</span> <span>- {getData.date}</span></div>
                            <h2 className='mb-4 font-bold'>{getData.title} </h2>
                            <p className='line-clamp-2'>{getData.description}</p>
                            <div className='mb-4 line-clamp-2' />
                        </div>
                    </div>
                ) : (
                    <p>Loading......</p>
                )
                }
            </div>
        </div>
    )
}

export default SinglePost
