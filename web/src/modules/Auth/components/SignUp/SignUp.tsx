"use client"

import { GlowingWrapper } from "@/shared/components"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Fade } from "react-awesome-reveal"
import { useAuth } from "@/shared/contexts/Auth/AuthContext"
import { toast } from "react-toastify"

export const SignUp = () => {
  const { signUp } = useAuth()
  const { push } = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onClickSignIn = () => {
    push("/auth/signin")
  }

  const onSignUp = () => {
    const { username, email, password, confirmPassword } = formData

    const usernameRegex = /^[a-zA-Z0-9-.]{4,}$/
    if (!usernameRegex.test(username)) {
      return toast.error(
        "Username must be at least 4 characters and contain only letters, numbers, hyphen or dot."
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return toast.error("Invalid email address.")
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters long.")
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.")
    }
  }

  return (
    <div className="grid grid-cols-10 h-screen overflow-hidden">
      <section className="col-span-7 relative">
        <h1
          onClick={() => push("/")}
          className="font-bold  z-[100] absolute bg-background rounded-full px-2 overflow-hidden py-1 shadow-md shadow-black/50 left-2 top-2 text-3xl cursor-pointer select-none flex gap-y-1"
        >
          <img src="/favicon.png" alt="" className="w-[32px] h-[32px]" />
          Camp
          <span className="background-gradient bg-clip-text text-transparent">
            fire
          </span>
        </h1>
        <span className="absolute z-[100] left-2 bottom-1 text-gray-400 text-xl font-medium">
          Art by Tyler Jacobson
        </span>
        <Fade>
          <img
            src="/wallpaper-1.jpg"
            className="w-full h-screen object-fill select-none pointer-events-none"
          />
        </Fade>
      </section>
      <section className="col-span-3 flex flex-col items-center justify-center">
        <div className="w-[350px] flex flex-col gap-y-2">
          <button
            // onClick={signUpWithGoogle}
            className="w-full rounded-full active:scale-95 text-center flex items-center justify-center gap-x-4 p-2 bg-white transition-all duration-300 ease-in-out"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 753 768"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M752.64 392.727C752.64 365.498 750.196 339.316 745.658 314.182H384V462.895H590.662C581.585 510.72 554.356 551.215 513.513 578.444V675.142H638.138C710.749 608.116 752.64 509.673 752.64 392.727Z"
                fill="#4285F4"
              />
              <path
                d="M384 768C487.68 768 574.604 733.789 638.138 675.142L513.513 578.444C479.302 601.484 435.665 615.447 384 615.447C284.16 615.447 199.331 548.073 168.96 457.309H41.1927V556.451C104.378 681.775 233.891 768 384 768Z"
                fill="#34A853"
              />
              <path
                d="M168.96 456.96C161.28 433.92 156.742 409.484 156.742 384C156.742 358.516 161.28 334.08 168.96 311.04V211.898H41.1927C15.0109 263.564 0 321.862 0 384C0 446.138 15.0109 504.436 41.1927 556.102L140.684 478.604L168.96 456.96Z"
                fill="#FBBC05"
              />
              <path
                d="M384 152.902C440.553 152.902 490.822 172.451 530.967 210.153L640.931 100.189C574.255 38.0509 487.68 0 384 0C233.891 0 104.378 86.2255 41.1927 211.898L168.96 311.04C199.331 220.276 284.16 152.902 384 152.902Z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-xl text-background font-bold">
              Sign up with Google
            </span>
          </button>
          <div className="flex items-center gap-x-2">
            <div className="border-t border-border h-0 w-full mx-auto my-2" />
            <span>OR</span>
            <div className="border-t border-border h-0 w-full mx-auto my-2" />
          </div>
          <GlowingWrapper inset="0" border="rounded-full">
            <input
              name="name"
              placeholder="Name"
              spellCheck="false"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="py-1 px-2 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-full bg-ashes border border-border outline-none"
            />
          </GlowingWrapper>
          <GlowingWrapper inset="0" border="rounded-full">
            <input
              name="username"
              placeholder="Username"
              spellCheck="false"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="py-1 px-2 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-full bg-ashes border border-border outline-none"
            />
          </GlowingWrapper>
          <GlowingWrapper inset="0" border="rounded-full">
            <input
              name="email"
              placeholder="Email"
              spellCheck="false"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="py-1 px-2 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-full bg-ashes border border-border outline-none"
            />
          </GlowingWrapper>
          <GlowingWrapper inset="0" border="rounded-full">
            <input
              name="password"
              placeholder="Password"
              spellCheck="false"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="py-1 px-2 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-full bg-ashes border border-border outline-none"
            />
          </GlowingWrapper>
          <GlowingWrapper inset="0" border="rounded-full">
            <input
              name="confirmPassword"
              placeholder="Confirm Password"
              spellCheck="false"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="py-1 px-2 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-full bg-ashes border border-border outline-none"
            />
          </GlowingWrapper>
          <button
            onClick={onSignUp}
            className="p-2 font-medium capitalize w-full text-center text-lg bg-button text-white rounded-full"
          >
            <span className="text-xl font-bold">Sign up</span>
          </button>
          <span className="text-gray-400">
            Already have an account?{" "}
            <strong
              onClick={onClickSignIn}
              className="text-blue-500 cursor-pointer underline font-normal"
            >
              Sign in
            </strong>
          </span>
        </div>
      </section>
    </div>
  )
}
