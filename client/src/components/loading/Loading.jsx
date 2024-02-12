const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex justify-center items-center">
        <div className="h-12 w-12 bg-blue-500 rounded-full mr-2 animate-bounce"></div>
        <div className="h-12 w-12 bg-blue-500 rounded-full mr-2 animate-bounce"></div>
        <div className="h-12 w-12 bg-blue-500 rounded-full mr-2 animate-bounce"></div>
        <div className="h-12 w-12 bg-blue-500 rounded-full mr-2 animate-bounce"></div>
        <div className="h-12 w-12 bg-blue-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loading;
