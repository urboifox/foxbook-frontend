export default function MainButton({ children, ...props }) {
  return (
    <div {...props}>
      <button className="bg-main-100 w-full h-full transition-colors hover:bg-main-200 text-black flex items-center justify-center font-medium py-2 rounded-sm">
        {children}
      </button>
    </div>
  );
}
