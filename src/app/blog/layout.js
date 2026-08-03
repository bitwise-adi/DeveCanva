import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
