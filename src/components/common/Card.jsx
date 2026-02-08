export default function Card({ children, className = '', hover = false, ...props }) {
  const hoverClass = hover ? 'hover:shadow-soft-lg hover:-translate-y-0.5 transition-all duration-300' : ''
  
  return (
    <div 
      className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-6 border border-blue-50/50 ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
