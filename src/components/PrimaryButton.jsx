export default function MainButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-main-100 transition-colors hover:bg-main-200 text-black font-medium py-2 rounded-sm"
    >
      {children}
    </button>
  );
}
