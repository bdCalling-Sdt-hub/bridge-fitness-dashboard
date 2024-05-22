import { RiEditLine } from 'react-icons/ri'
import avater from '../../assets/avater.png'
import { useForm } from "react-hook-form"
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
const AdminProfile = () => {
    const [showEditProfile, setShowEditProfile] = useState(true)
    const [oldPasswordType, setoldPasswordType] = useState('password')
    const [newPasswordType, setnewPasswordType] = useState('password')
    const [confirmNewPasswordType, setConfirmNewPasswordType] = useState('password')
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => console.log(data)
    return (
        <div>
            <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>Admin Profile(Super Admin)</h1>
            <div className='flex justify-center items-center flex-col gap-3 bg-[#FEFEFE] py-6 max-w-[840px] mx-auto rounded-lg mt-12 mb-6'>
                <div className='w-32 h-32 rounded-full relative'>
                    <img className='w-full h-full object-cover rounded-full' src={avater} alt="" />
                    <RiEditLine className='absolute bottom-3 bg-white right-1 text-3xl rounded-full p-1 cursor-pointer' />
                </div>
                <h3 className='text-3xl font-medium text-[#262727] mt-3'>Mr. Admin</h3>
            </div>
            <div className='flex justify-center items-center gap-4'>
                <button onClick={() => setShowEditProfile(true)} className={`text-[#6D6D6D] ${showEditProfile ? 'showProfilePassword' : ''}`}>Edit Profile</button>
                <button onClick={() => setShowEditProfile(false)} className={`text-[#6D6D6D] ${showEditProfile ? '' : 'showProfilePassword'}`}>Change Password</button>
            </div>
            {
                showEditProfile ? <div className=' bg-[#FEFEFE] py-6 max-w-[840px] mx-auto rounded-lg mt-6 mb-6'>
                    <h3 className='text-center text-2xl font-medium mb-6'>Edit Your Profile</h3>
                    <form className='flex justify-center items-center flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
                        <label className='w-[60%] mx-auto'>
                            <p className='mb-2 text-[#575757]'>User Name</p>
                            <input type='text' className='w-full border  outline-none p-3 rounded-md text-[#607888]' defaultValue="Asadujjaman " {...register("name", { required: true })} />
                            {errors.name && <p className='text-red-500'>This field is required</p>}
                        </label>
                        <label className='w-[60%] mx-auto'>
                            <p className='mb-2 text-[#575757]'>Email</p>
                            <input type='email' className='w-full border  outline-none p-3 rounded-md text-[#607888]' defaultValue="Asadujjaman@gmail.com " {...register("email", { required: true })} />
                            {errors.email && <p className='text-red-500'>This field is required</p>}
                        </label>
                        <label className='w-[60%] mx-auto'>
                            <p className='mb-2 text-[#575757]'>Contact no</p>
                            <input type='text' className='w-full border  outline-none p-3 rounded-md text-[#607888]' defaultValue="+99007007007 " {...register("contact", { required: true })} />
                            {errors.contact && <p className='text-red-500'>This field is required</p>}
                        </label>
                        <label className='w-[60%] mx-auto'>
                            <p className='mb-2 text-[#575757]'>Address</p>
                            <input type='text' className='w-full border  outline-none p-3 rounded-md text-[#607888]' defaultValue="79/A Joker Vila, Gotham City" {...register("address", { required: true })} />
                            {errors.address && <p className='text-red-500'>This field is required</p>}
                        </label>
                        <input className='p-3 px-6 rounded-lg cursor-pointer mt-3 bg-[#12354E] text-[#FCFCFC]' value={`Save & Change`} type="submit" />
                    </form>
                </div> : <div className=' bg-[#FEFEFE] py-6 max-w-[840px] mx-auto rounded-lg mt-6 mb-6'>
                    <h3 className='text-center text-2xl font-medium mb-6'>Change Your Password</h3>
                    <form className='flex justify-center items-center flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
                        <div className='w-[60%] mx-auto'>
                            <p className='mb-2 text-[#575757]'>Current Password</p>
                            <label className='w-full relative'>
                                <input type={oldPasswordType} className='w-full border  outline-none p-3 rounded-md text-[#607888]' defaultValue="Current Password" {...register("currentPassword", { required: true })} />
                                <button className='text-2xl absolute top-[50%] -translate-y-[50%] right-2 hover:scale-105 active:scale-95 transition-all'>
                                    {oldPasswordType === 'password' ? < FaEyeSlash onClick={() => setoldPasswordType('text')} /> : <FaEye onClick={() => setoldPasswordType('password')} />}
                                </button>
                                {errors.currentPassword && <p className='text-red-500'>This field is required</p>}
                            </label>
                        </div>
                        <div className='w-[60%] mx-auto'>
                            <p className='mb-2 text-[#575757]'>New Password</p>
                            <label className='w-full relative'>
                                <input type={newPasswordType} className='w-full border  outline-none p-3 rounded-md text-[#607888]' defaultValue="New Password" {...register("newPassword", { required: true })} />
                                <button className='text-2xl absolute top-[50%] -translate-y-[50%] right-2 hover:scale-105 active:scale-95 transition-all'>
                                    {newPasswordType === 'password' ? < FaEyeSlash onClick={() => setnewPasswordType('text')} /> : <FaEye onClick={() => setnewPasswordType('password')} />}
                                </button>
                                {errors.currentPassword && <p className='text-red-500'>This field is required</p>}
                            </label>
                        </div>
                        <div className='w-[60%] mx-auto'>
                            <p className='mb-2 text-[#575757]'>Confirm New Password</p>
                            <label className='w-full relative'>
                                <input type={confirmNewPasswordType} className='w-full border  outline-none p-3 rounded-md text-[#607888]' defaultValue="Confirm New Password" {...register("newPassword", { required: true })} />
                                <button className='text-2xl absolute top-[50%] -translate-y-[50%] right-2 hover:scale-105 active:scale-95 transition-all'>
                                    {confirmNewPasswordType === 'password' ? < FaEyeSlash onClick={() => setConfirmNewPasswordType('text')} /> : <FaEye onClick={() => setConfirmNewPasswordType('password')} />}
                                </button>
                                {errors.currentPassword && <p className='text-red-500'>This field is required</p>}
                            </label>
                        </div>
                        <input className='p-3 px-6 rounded-lg cursor-pointer mt-3 bg-[#12354E] text-[#FCFCFC]' value={`Save & Change`} type="submit" />
                    </form>
                </div>
            }

        </div>
    )
}

export default AdminProfile
