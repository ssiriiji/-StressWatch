export default function Card({ children, className = '', hover = false, ...props }) {
  const hoverClass = hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : ''
  
  return (
    <div 
      className={`bg-white rounded-2xl shadow-md p-6 ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
