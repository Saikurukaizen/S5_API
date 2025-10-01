<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder{

    public function run(): void{
        $user = UserFactory::new()->create([
            'name' => 'Doom',
            'lastname' => 'Eternal',
            'date_of_birth' => '1999-06-06',
            'email' => 'doom@user.com',
            'email_verified_at' => now(),
            'password' => bcrypt('666'),
            'remember_token' => Str::random(10),
            'bank_acc' => '666666666D',
            'discipline_id' => 1,
            'role' => 'user',
        ]);

        $user->createToken('Personal Access Token');

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
        $admin->createToken('Personal Access Token');
    }
}
?>