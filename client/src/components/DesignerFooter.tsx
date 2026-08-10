const DesignerFooter = () => {
  return (
    <footer className="py-6 px-4 border-t border-gray-200 bg-gray-50">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <p className="text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Cortexuum &middot; Proven Marketing Systems
        </p>
        <span className="hidden sm:block text-gray-300">|</span>
        <div className="flex items-center gap-4">
          <a href="/privacy" className="text-gray-500 hover:text-gray-700 text-xs transition-colors">Privacy</a>
          <a href="/terms" className="text-gray-500 hover:text-gray-700 text-xs transition-colors">Terms</a>
          <a href="/cookies" className="text-gray-500 hover:text-gray-700 text-xs transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default DesignerFooter;
