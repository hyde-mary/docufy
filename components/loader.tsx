export const Loader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>

        <div className="absolute inset-0 border-4 border-t-primary border-transparent rounded-full animate-spin"></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
      </div>
    </div>
  );
};
