import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ResumeLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
