import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function ProfileInfo() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let user = null;

  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
        <img
          src={user?.profil?.imageUrl || "/assets/dashboard/default-profile.png"}
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <span className="hidden md:inline text-[#243B83] font-medium">
        {user?.nama || "loading"}
      </span>
    </div>
  );
}
