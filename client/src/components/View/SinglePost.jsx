import { useEffect, useState } from 'react'
import file from '../Img/file.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { AiFillEdit } from 'react-icons/ai'

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


    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                axios.delete(`http://localhost:3001/delete/${id}`).then(res => {
                    navigate('/');
                    if (res.status === 200) {
                        setDeleteBlog(!deleteBlog);
                    }
                });
            } catch (error) {
                console.log(error)
            }
        }
    };


    return (
        <div className='p-4 grid grid-cols-8'>
            <div className='w-full col-span-7 shadow-sm shadow-gray-300 border border-gray-300'>
                {getData ? (
                    <div className='w-full'>
                        <div className='h-[450px] w-full bg-purple-400'
                            style={{
                                backgroundImage: `url(${`http://localhost:3001/` + getData.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }} />
                        <div className='grid grid-cols-4 mt-4'>
                            <div className='flex col-span-2'>
                                <div className='rounded-full w-12 bg-cyan-600 mr-[10px]'
                                    style={{
                                        backgroundImage: `url(${file})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}></div>
                                <div><strong>Alember Shreesh</strong><br />
                                    <span>Posted 2 days ago</span></div>
                            </div>
                            <div className='flex col-start-4 mt-5 items-center gap-5 w-11/12 justify-end'>
                                <div onClick={() => handleDelete(getData.id)}>
                                    <RiDeleteBin6Fill className='text-red-600 text-2xl' />
                                </div>
                                <Link to={`/update/${getData.id}`}>
                                    <AiFillEdit className='text-purple-600 text-2xl' />
                                </Link>
                            </div>
                        </div>
                        <div className='px-3 py-3'>
                            <div className='mb-1'><span>{getData.subtitle}</span> <span>- {getData.date}</span></div>
                            <h2 className='mb-4 font-bold'>{getData.title} </h2>
                            <p className=''>{getData.description}</p>
                            <div className='mb-4' />
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
