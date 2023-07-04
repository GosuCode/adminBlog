import { useState, useEffect } from 'react';
import bunny from '../Img/bunny.jpeg';
import axios from 'axios';
import { Link } from 'react-router-dom';

const View = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/view");
                setBlogs(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='grid grid-cols-3'>
            {blogs && blogs.map((val, key) => (
                <div key={key} className='p-4'>
                    <div className='w-full shadow-sm hover:shadow-lg group overflow-clip shadow-gray-300 border border-gray-300'>
                        <div className='w-full'>
                            <div
                                className='h-[280px] w-full bg-lime-500 group-hover:scale-105 transition-all duration-300'
                                style={{
                                    backgroundImage: `url(${bunny})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }}
                            />
                            <div className='px-3 py-3'>
                                <div className='mb-1'>
                                    <span>{val.subtitle}</span> <span>- {val.date}</span>
                                </div>
                                <Link to={`/postById/${val.id}`}>
                                    <h2 className='mb-4 font-bold'>{val.title}</h2>
                                    <p className='line-clamp-2'>{val.description}</p>
                                    <div className='mb-4 line-clamp-2' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default View;
