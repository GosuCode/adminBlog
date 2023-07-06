
const ProfileInfo = () => {
    const UserInfo = [
        {
            name: 'name'
        },
        {
            name: 'email'
        },
        {
            name: 'about'
        },
        {
            name: 'registered'
        },
    ]
    return (
        <div className="mt-8">
            <div>
                {
                    UserInfo.map((val, key) => {
                        return (
                            <div key={key} className='mt-8 capitalize font-semibold'>
                                {val.name}
                            </div>
                        )
                    })
                }
            </div>
            <div className="grid grid-cols-4 gap-4 mt-8">
                <button className="bg-purple-500 col-start-2">SIGN OUT</button>
                <button className="bg-purple-500 col-start-3">UPDATE PROFILE</button>
            </div>
        </div>
    )
}

export default ProfileInfo
