import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai'


const View = () => {
    const [search, setSearch] = useState('')
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
        <div>
            <div className='flex-[6]'>
                <div className='border-2 w-[400px] border-b-gray-400 rounded-lg flex mx-36 mt-2'>
                    {/* width causes problem in responsiveness */}
                    <AiOutlineSearch className='text-2xl bg-slate-100' />
                    <input type="text"
                        className='outline-none w-[400px] pl-4'
                        placeholder='Search across your blog'
                        onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>

            <div className='grid grid-cols-3'>
                {blogs && blogs.filter((val) => {
                    return search.toLowerCase() === ''
                        ? val
                        : val.categories.toLowerCase().includes(search)
                }).map((val, key) => (
                    <div key={key} className='p-4'>
                        <div className='w-full shadow-sm hover:shadow-lg group overflow-clip shadow-gray-300 border border-gray-300'>
                            <div className='w-full'>
                                <div
                                    className='h-[280px] w-full bg-purple-500 group-hover:scale-105 transition-all duration-300'
                                    style={{
                                        backgroundImage: `url(${'http://localhost:3001/' + val.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                />
                                <div className='px-3 py-3'>
                                    <div className='mb-1'>
                                        <span>{val.categories}</span> <span>- {val.date}</span>
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
        </div>
    );
};

export default View;
