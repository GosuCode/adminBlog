import { useState, useEffect } from 'react';
import bunny from '../Img/bunny.jpeg';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Stats = () => {
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
        <div className="mt-8 w-11/12">
            <div className="grid grid-cols-3 border border-slate-400 rounded-md">
                <div className="border border-slate-400 p-4 text-right">0 followers</div>
                <div className="border border-slate-400 p-4 text-center">5 posts</div>
                <div className="border border-slate-400 p-4 text-left">0 comments</div>
            </div>

            <div className='border border-slate-400 rounded-md'>
                <div>Posts</div>

                <div>
                    {
                        blogs.map((val, i) => {
                            return <div key={i}>
                                <div className='grid grid-cols-12 w-full group overflow-clip mt-12'>
                                    <div
                                        className='h-[150px] w-[200px] rounded-md bg-purple-500 col-start-2'
                                        style={{
                                            backgroundImage: `url(${bunny})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center"
                                        }} />
                                    <div className='px-3 py-3 col-start-5 col-span-7'>
                                        <div className='mb-1'><span>{val.subtitle}</span> <span>- {val.date}</span></div>
                                        <h2 className='mb-4 font-bold'>{val.title}</h2>
                                        <Link to={`/viewmore/${val.id}`}>
                                            <div className='mb-4 line-clamp-2' dangerouslySetInnerHTML={{ __html: val.description }} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Stats
