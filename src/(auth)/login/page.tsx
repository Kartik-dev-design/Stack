"use client"
import { useAuthStore } from '@/src/store/Auth'
import React from 'react'
function Loginpage() {
  const {login}=useAuthStore()
  const [isloading,setisloading]=React.useState(false)
  const [error,seterror]=React.useState("")
  const handlesubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault()
     //collect the data 
     const formData=new FormData(e.currentTarget)
     const email=formData.get("email")
     const password=formData.get("password")
     if(!email || !password) {
      seterror(()=>"Please fill all fields")
      return 
     }
     const loginResponse=await login(email.toString(),password.toString())
     // validate 
     //login=>store
     setisloading(()=>true)
     if(loginResponse.error){
      seterror(()=>loginResponse.error!.message)
     }
  }
return (
    <div>Login page</div>
  )
}
export default Loginpage