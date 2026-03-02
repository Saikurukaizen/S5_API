<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Community;
use App\Models\User;

class CommunityUserSeeder extends Seeder
{
    public function run(): void
    {
        // Get existing communities and users
        $communities = Community::all();
        $users = User::all();
        
        if ($communities->isEmpty() || $users->isEmpty()) {
            $this->command->error('No communities or users found. Please run CommunitySeeder and UserSeeder first.');
            return;
        }

        $this->command->info("Assigning users to communities...");
        $this->command->info("Available users: {$users->count()}");
        $this->command->info("Available communities: {$communities->count()}");

        // Assign users to communities
        foreach ($communities as $community) {
            // Get random users (between 3-6 members per community)
            $memberCount = rand(3, min(6, $users->count()));
            $randomUsers = $users->random($memberCount);
            
            // Attach users to community
            $community->members()->attach($randomUsers->pluck('id'));
            
            $this->command->info("  - Assigned {$memberCount} members to '{$community->name}'");
        }
        
        $this->command->info('CommunityUserSeeder completed successfully!');
    }
}