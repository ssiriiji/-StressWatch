import ActivityCard from './ActivityCard'

export default function ActivityGrid({ activities, onActivityClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activities.map((activity) => (
        <ActivityCard 
          key={activity.id} 
          activity={activity}
          onClick={() => onActivityClick(activity)}
        />
      ))}
    </div>
  )
}
