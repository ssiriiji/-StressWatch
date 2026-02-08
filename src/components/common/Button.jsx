export default function Button({ children, variant = 'primary', size = 'md', onClick, disabled, className = '', ...props }) {
  const baseStyles = 'font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white hover:shadow-soft-lg hover:scale-[1.02]',
    secondary: 'bg-white text-blue-600 border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300',
    outline: 'bg-transparent border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50',
    ghost: 'bg-transparent text-gray-700 hover:bg-blue-50',
    danger: 'bg-red-400 text-white hover:bg-red-500',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
