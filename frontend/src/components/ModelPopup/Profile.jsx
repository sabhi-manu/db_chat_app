import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    let { user } = useSelector((state) => state.auth)
    console.log("login user ==>", user)
    return (
        <div className="modal fade" id="profileModal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">


                    <div className="modal-header">
                        <h5 className="modal-title">Profile</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>


                    <div className="modal-body text-center">
                        <img
                            src={
                                user?.avatar
                                    ? user.avatar
                                    : "https://images.unsplash.com/photo-1763244737839-220b4cd0259e?w=500&auto=format&fit=crop&q=60"
                            }
                            className="rounded-circle mb-3 m-auto"
                            width="150"
                            height="150"
                        />

                        <h4 className="mb-1"><strong>User Name :</strong> {user?.name} </h4>
                        <p className="text-muted"><strong>Email:</strong> {user?.email} </p>
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>


                </div>
            </div>

        </div>

    )
}

export default Profile


