import { Link } from "wouter";

const LegalHeader = () => {
  return (
    <header className="bg-white py-6 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center">
              <span className="text-2xl font-bold">
                PlainTalk<span className="text-primary"> Developers</span>
              </span>
            </a>
          </Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/">
                  <a className="text-gray-600 hover:text-primary font-medium">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="text-gray-600 hover:text-primary font-medium">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="text-gray-600 hover:text-primary font-medium">Terms</a>
                </Link>
              </li>
              <li>
                <Link href="/cookies">
                  <a className="text-gray-600 hover:text-primary font-medium">Cookie Policy</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default LegalHeader;