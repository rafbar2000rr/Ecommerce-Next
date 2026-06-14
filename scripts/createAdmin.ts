import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import User from "@/models/User"
import { connectDB } from "@/lib/mongodb"

async function run() {
  await connectDB()

  const hashed = await bcrypt.hash("1234", 10)

  await User.create({
    email: "admin@test.com",
    password: hashed,
    role: "admin",
  })

  console.log("Admin created")
  process.exit()
}

run()