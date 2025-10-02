import FooterNav from "@/components/general/FooterNav";
import Navbar from "@/components/general/Navbar";
import Sidebar from "@/components/general/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="hidden md:block w-64">
        <Sidebar />
      </div>
      <div className="w-full">
        <Navbar />
        {children}
        <FooterNav />
      </div>
    </div>
  );
}
