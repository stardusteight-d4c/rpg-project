"use client"

import { useState } from "react"
import { Fade } from "react-awesome-reveal"
import { redirect } from "next/navigation"
import { useAuth, useToast } from "@/shared/contexts"
import { GlowingWrapper } from "@/shared/components/ui"

export const SignUp = () => {
  const { addToast } = useToast()
  const { signUp } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    name: "Gabriel Sena",
    email: "sena@example.com",
    username: "blackwive",
    password: "secretpassword",
    confirmPassword: "secretpassword",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onClickSignIn = () => {
    redirect("/auth/signin")
  }

  const onSignUp = async () => {
    if (isLoading) return
    setIsLoading(true)

    const { name, username, email, password, confirmPassword } = formData

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+ [A-Za-zÀ-ÖØ-öø-ÿ]+$/
    const usernameRegex = /^[a-z0-9]+$/

    if (!nameRegex.test(name)) {
      setIsLoading(false)
      return addToast(`The name must follow the format "Name Surname"`, "error")
    }

    if (!usernameRegex.test(username)) {
      setIsLoading(false)
      return addToast(
        "The username must be in lowercase, have at least 4 characters and contain only letters and numbers.",
        "error"
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setIsLoading(false)
      return addToast("Invalid email address.", "error")
    }

    if (password.length < 8) {
      setIsLoading(false)
      return addToast("Password must be at least 8 characters long.", "error")
    }

    if (password !== confirmPassword) {
      setIsLoading(false)
      return addToast("Passwords do not match.", "error")
    }

    signUp(formData)
      .catch((error) => {
        addToast(error.message, "error")
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="grid grid-cols-10 h-screen overflow-hidden">
      <section className="col-span-7 relative">
        <h1
          onClick={() => redirect("/")}
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
              id="name"
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
            className={`${
              isLoading && " cursor-not-allowed select-none brightness-90 "
            } p-2 font-medium capitalize w-full max-h-[45px] text-center text-lg bg-button text-white rounded-full`}
          >
            <span className="text-xl font-bold">
              {isLoading ? (
                <div className="w-fit mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#FFFFFF"
                    className="animate-spin"
                    viewBox="0 0 256 256"
                  >
                    <path d="M136,32V64a8,8,0,0,1-16,0V32a8,8,0,0,1,16,0Zm88,88H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.09,47.6a8,8,0,0,0-11.31,11.31l22.62,22.63a8,8,0,0,0,11.32-11.32ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184ZM77.09,167.6,54.46,190.22a8,8,0,0,0,11.32,11.32L88.4,178.91A8,8,0,0,0,77.09,167.6ZM72,128a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H64A8,8,0,0,0,72,128ZM65.78,54.46A8,8,0,0,0,54.46,65.78L77.09,88.4A8,8,0,0,0,88.4,77.09Z"></path>
                  </svg>
                </div>
              ) : (
                "Sign up"
              )}
            </span>
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
