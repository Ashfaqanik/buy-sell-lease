import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

type PageLayoutProps = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="page-layout">
      <Navbar />

      <main className="page-layout__main">{children}</main>

      <Footer />
    </div>
  );
};

export default PageLayout;
