import Link from "next/link";

interface TestimonialProps {
  image: string;
  title: string;
  subTitle: string;
}

const HomePage = ({ image, title, subTitle }: TestimonialProps) => {

  return (
    <div className="max-w-2xl text-center mx-auto bg-gray-900 overflow-hidden">
        <div className="p-6">
            <h2 className="text-5xl font-bold text-white">{title}</h2>
            <p className="text-gray-400 text-lg m-2">{subTitle}</p>
        </div>
        <img
            src={image}
            alt={title}
            className="w-full object-cover"
            width={800}
            height={600}
        />
        <Link href="/pages/dashboard"><button className="text-white bg-blue-600 px-8 py-3 rounded-md hover:bg-blue-500">Try FREE Now</button></Link>
    </div>
  );
};

export default HomePage;