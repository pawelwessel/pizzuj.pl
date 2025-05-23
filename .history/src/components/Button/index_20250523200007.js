export default function CtaButton({ children, className, ...props }) {
  return (
    <button
      className={`bg-[#333] text-white px-6 py-3 rounded-t-lg z-10 duration-300 text-center w-max items-center flex ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
