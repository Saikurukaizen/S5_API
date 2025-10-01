<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Discipline;
use Database\Factories\UserFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder{

    public function run(): void{

        $this->call([
            DisciplineSeeder::class,
        ]);

        $firstDiscipline = Discipline::first();
        $disciplineId = $firstDiscipline ? $firstDiscipline->id : null;

        $user = UserFactory::new()->create([
            'name' => 'Doom',
            'lastname' => 'Eternal',
            'date_of_birth' => '1999-06-06',
            'email' => 'doom@user.com',
            'email_verified_at' => now(),
            'password' => bcrypt('666'),
            'remember_token' => Str::random(10),
            'bank_acc' => '666666666D',
            'discipline_id' => $disciplineId,
            'role' => 'user',
        ]);

        $admin = UserFactory::new()->create([
            'name' => 'Lux',
            'lastname' => 'Triumfantis',
            'date_of_birth' => '2000-01-01',
            'email' => 'lux@admin.com',
            'email_verified_at' => now(),
            'password' => bcrypt('8000'),
            'remember_token' => Str::random(10),
            'bank_acc' => '1234567890',
            'discipline_id' => null,
            'role' => 'admin',
        ]);

        $this->call([
            PassportSeeder::class,
        ]);

        $this->createTokensIfPossible($user, $admin);
    }
    
    private function createTokensIfPossible($user, $admin): void{
        try{
            $user->createToken('API Token');
            $admin->createToken('API Token');
            echo "V- Tokens created for users\n";
        } catch(\Exception $e){
            echo "! Tokens could not be created: " . $e->getMessage() . "\n";
            echo "  Users are created and can use login to obtain tokens\n";
        }
    }
}
