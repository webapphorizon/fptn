const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-[94rem] mx-auto px-4 md:px-8">{children}</div>;
};

export default Wrapper;