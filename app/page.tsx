import AppbarClient from "./components/AppbarClient";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
    <AppbarClient />
      <main className="max-w-5xl mx-auto px-4 py-8">
        Hi there!
      </main>
      <Footer />
    </>
  );
}
