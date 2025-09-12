import HeaderDashboard from "@/components/HeaderDashboard";
import ProfileInfo from "@/components/ProfileInfo";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <HeaderDashboard>
        {/* server slot: isi Profile */}
        <ProfileInfo />
      </HeaderDashboard>
      <main>{children}</main>
    </div>
  );
}
