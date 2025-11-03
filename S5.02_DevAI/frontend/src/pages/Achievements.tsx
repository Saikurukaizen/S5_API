import React, { useState } from 'react';
import './Achievements.css';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'fitness' | 'social' | 'milestone' | 'special';
  isUnlocked: boolean;
  unlockedDate?: string;
  progress?: {
    current: number;
    total: number;
    unit: string;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
}

const mockAchievements: Achievement[] = [
  // Fitness Category
  {
    id: 'first_workout',
    title: 'Primer Paso',
    description: 'Completa tu primer entrenamiento en la plataforma',
    icon: '🏃',
    category: 'fitness',
    isUnlocked: true,
    unlockedDate: '2024-10-30',
    rarity: 'common',
    xpReward: 50
  },
  {
    id: 'fire_streak',
    title: 'Racha de Fuego',
    description: '15 días consecutivos de entrenamiento',
    icon: '🔥',
    category: 'fitness',
    isUnlocked: true,
    unlockedDate: '2024-11-03',
    rarity: 'rare',
    xpReward: 200
  },
  {
    id: 'distance_runner',
    title: 'Corredor de Distancia',
    description: 'Corre un total de 100 km',
    icon: '🏃‍♂️',
    category: 'fitness',
    isUnlocked: false,
    progress: { current: 73, total: 100, unit: 'km' },
    rarity: 'rare',
    xpReward: 300
  },
  {
    id: 'iron_will',
    title: 'Voluntad de Hierro',
    description: 'Completa 50 entrenamientos de fuerza',
    icon: '🏋️‍♂️',
    category: 'fitness',
    isUnlocked: false,
    progress: { current: 32, total: 50, unit: 'entrenamientos' },
    rarity: 'epic',
    xpReward: 500
  },

  // Social Category
  {
    id: 'social_butterfly',
    title: 'Mariposa Social',
    description: 'Únete a tu primera comunidad',
    icon: '👥',
    category: 'social',
    isUnlocked: true,
    unlockedDate: '2024-10-25',
    rarity: 'common',
    xpReward: 75
  },
  {
    id: 'community_leader',
    title: 'Líder Comunitario',
    description: 'Únete a 5 comunidades diferentes',
    icon: '👑',
    category: 'social',
    isUnlocked: false,
    progress: { current: 2, total: 5, unit: 'comunidades' },
    rarity: 'epic',
    xpReward: 400
  },
  {
    id: 'motivator',
    title: 'Motivador',
    description: 'Recibe 25 likes en tus publicaciones',
    icon: '💪',
    category: 'social',
    isUnlocked: false,
    progress: { current: 18, total: 25, unit: 'likes' },
    rarity: 'rare',
    xpReward: 250
  },

  // Milestone Category
  {
    id: 'elite_athlete',
    title: 'Atleta Elite',
    description: 'Alcanza 1000 puntos de experiencia',
    icon: '🏅',
    category: 'milestone',
    isUnlocked: false,
    progress: { current: 847, total: 1000, unit: 'XP' },
    rarity: 'epic',
    xpReward: 1000
  },
  {
    id: 'fitness_master',
    title: 'Maestro del Fitness',
    description: 'Alcanza el nivel 10',
    icon: '🎖️',
    category: 'milestone',
    isUnlocked: false,
    progress: { current: 7, total: 10, unit: 'nivel' },
    rarity: 'legendary',
    xpReward: 2000
  },

  // Special Category
  {
    id: 'early_adopter',
    title: 'Adoptante Temprano',
    description: 'Regístrate en la versión beta',
    icon: '⭐',
    category: 'special',
    isUnlocked: true,
    unlockedDate: '2024-10-15',
    rarity: 'legendary',
    xpReward: 500
  },
  {
    id: 'perfectionist',
    title: 'Perfeccionista',
    description: 'Completa todos los logros de fitness',
    icon: '💎',
    category: 'special',
    isUnlocked: false,
    progress: { current: 2, total: 8, unit: 'logros' },
    rarity: 'legendary',
    xpReward: 5000
  }
];

const Achievements: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Todos', icon: '🏆' },
    { id: 'fitness', name: 'Fitness', icon: '💪' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'milestone', name: 'Hitos', icon: '🎯' },
    { id: 'special', name: 'Especiales', icon: '⭐' }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? mockAchievements 
    : mockAchievements.filter(achievement => achievement.category === selectedCategory);

  const unlockedCount = mockAchievements.filter(a => a.isUnlocked).length;
  const totalXp = mockAchievements.filter(a => a.isUnlocked).reduce((sum, a) => sum + a.xpReward, 0);

  const getRarityClass = (rarity: string) => {
    return `rarity-${rarity}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Desbloqueado ayer';
    if (diffDays === 0) return 'Desbloqueado hoy';
    return `Desbloqueado hace ${diffDays} días`;
  };

  return (
    <div className="achievements-page">
      <div className="achievements-header">
        <h1 className="page-title">
          <span className="title-icon">🏆</span>
          <span>Logros</span>
        </h1>
        <p className="page-subtitle">
          Desbloquea logros completando desafíos y alcanzando metas
        </p>
        
        <div className="achievements-stats">
          <div className="stat-card">
            <div className="stat-value">{unlockedCount}</div>
            <div className="stat-label">Desbloqueados</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{mockAchievements.length}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalXp}</div>
            <div className="stat-label">XP Ganado</div>
          </div>
        </div>
      </div>

      <div className="achievements-content">
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>

        <div className="achievements-grid">
          {filteredAchievements.map(achievement => (
            <div
              key={achievement.id}
              className={`achievement-card ${achievement.isUnlocked ? 'unlocked' : 'locked'} ${getRarityClass(achievement.rarity)}`}
            >
              <div className="achievement-header">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-rarity">{achievement.rarity}</div>
              </div>
              
              <div className="achievement-content">
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>
                
                {achievement.isUnlocked ? (
                  <div className="achievement-unlocked">
                    <span className="unlock-date">{formatDate(achievement.unlockedDate!)}</span>
                    <span className="xp-reward">+{achievement.xpReward} XP</span>
                  </div>
                ) : (
                  <div className="achievement-locked">
                    {achievement.progress && (
                      <div className="progress-info">
                        <div className="progress-text">
                          {achievement.progress.current}/{achievement.progress.total} {achievement.progress.unit}
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ 
                              width: `${(achievement.progress.current / achievement.progress.total) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                    <span className="potential-xp">🏆 {achievement.xpReward} XP</span>
                  </div>
                )}
              </div>
              
              {!achievement.isUnlocked && (
                <div className="lock-overlay">
                  <div className="lock-icon">🔒</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;