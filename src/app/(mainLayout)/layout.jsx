import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <div className="">
      <Navbar />
      <div className="grow flex flex-col">{children}</div>
      <Footer />
    </div>
  );
}
