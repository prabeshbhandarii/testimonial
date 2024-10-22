import AppbarClient from "./components/AppbarClient";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";

export default function Home() {
  return (
    <>
    <AppbarClient />
      <HomePage image={"https://c8.alamy.com/comp/2JCYP0R/web-testimonial-icon-design-element-2JCYP0R.jpg"}
       title={"Get testimonials from your customers with ease"}
        subTitle={"Collecting testimonials is hard, So we built Testimonial. In minutes, you can collect testimonials from your customers with no need for a developer."} />
      <Footer />
    </>
  );
}
