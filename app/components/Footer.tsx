const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Testimonial</h3>
            <p>Easiest way to get testimonial from your customers.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Products</h4>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul>
              <li>About Us</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Latest Updates</h4>
            <p>Brief information about your latest product update or feature.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer