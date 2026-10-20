"use client"
import { useAuthStore } from '@/src/store/Auth'
import React from 'react'
function page() {
    const {createAccount,login}=useAuthStore()
    const [loading,setloading]=React.useState(false)
    const [error,seterror]=React.useState("")
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault()
     const formData=new FormData(e.currentTarget)
     const firstname= formData.get("firstname")
     const lastname=formData.get("lastname")
     const email=formData.get("email")
     const password=formData.get("password")
     if(!firstname || !lastname || !email || !password) {
            seterror(()=>"Please filed all the flieds")
            return 
     }
     setloading(true)
     seterror("")
     const response=await createAccount(
      `${firstname} ${lastname}`,
       email?.toString(),
       password?.toString()
     )
     if(response.error){
      seterror(()=>response.error!.message)
     }
     else{
        const loginResponse=await login(email.toString(),password.toString())
        if(loginResponse.error){
          seterror(()=>loginResponse.error!.message)
        }
     }
     setloading(()=>false)
    }
  return (
    <div>{error &&(
      <p>{error}</p>
    )}
    <form onSubmit={handleSubmit}>
    </form>
    </div>
  )
}
export default page