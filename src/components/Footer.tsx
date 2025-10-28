const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} Kevin. Built with{" "}
          <span className="text-red-500">❤</span> using React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
