import React from 'react';
import './ActivityTimeline.css';

interface ActivityItem {
  id: string;
  date: string;
  text: string;
  type: 'join' | 'event' | 'update' | 'achievement';
}

// TODO: Connect to API - activity data will come from backend
// The activityService exists in src/api/activities.ts but needs integration
// Mock activity data - Replace with real API integration when activities endpoint is implemented
const mockActivities: ActivityItem[] = [
  {
    id: '1',
    date: 'HACE 2 HORAS',
    text: 'Te uniste a <strong>Running BCN</strong>',
    type: 'join'
  },
  {
    id: '2',
    date: 'HACE 1 DÍA',
    text: 'Completaste el evento <strong>Maratón Barcelona</strong>',
    type: 'event'
  },
  {
    id: '3',
    date: 'HACE 3 DÍAS',
    text: 'Actualizaste tu perfil',
    type: 'update'
  },
  {
    id: '4',
    date: 'HACE 1 SEMANA',
    text: 'Te uniste a <strong>Cycling Masters</strong>',
    type: 'join'
  },
  {
    id: '5',
    date: 'HACE 2 SEMANAS',
    text: 'Creaste tu cuenta en <strong>FITBIT</strong>',
    type: 'achievement'
  }
];

export const ActivityTimeline: React.FC = () => {
  // TODO: Replace with real API call
  // const { data: activities, isLoading } = useQuery({
  //   queryKey: ['user-activities'],
  //   queryFn: () => activityService.getActivities({ user_id: user?.id })
  // });

  return (
    <div className="card activity-timeline-card">
      <h3 className="section-title">📊 ACTIVIDAD RECIENTE</h3>

      <div className="activity-timeline">
        {mockActivities.map((activity) => (
          <div key={activity.id} className={`activity-item activity-${activity.type}`}>
            <div className="activity-date">{activity.date}</div>
            <div 
              className="activity-text"
              dangerouslySetInnerHTML={{ __html: activity.text }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};