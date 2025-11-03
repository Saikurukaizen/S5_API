<?php

require_once 'vendor/autoload.php';

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

// Check if admin exists
$admin = User::where('email', 'lux@admin.com')->first();

if (!$admin) {
    echo "Admin user not found. Creating admin user...\n";
    
    $admin = User::create([
        'name' => 'Lux',
        'lastname' => 'Triumfantis', 
        'date_of_birth' => '2000-01-01',
        'email' => 'lux@admin.com',
        'email_verified_at' => now(),
        'password' => Hash::make('8000'),
        'bank_acc' => '1234567890',
        'discipline_id' => null,
        'role' => 'admin',
    ]);
    
    echo "Admin user created successfully!\n";
} else {
    echo "Admin user already exists.\n";
    echo "Testing password...\n";
    
    if (Hash::check('8000', $admin->password)) {
        echo "Password is correct!\n";
    } else {
        echo "Password is incorrect. Updating password...\n";
        $admin->update(['password' => Hash::make('8000')]);
        echo "Password updated!\n";
    }
}

echo "Admin user details:\n";
echo "- ID: " . $admin->id . "\n";
echo "- Name: " . $admin->name . "\n"; 
echo "- Email: " . $admin->email . "\n";
echo "- Role: " . $admin->role . "\n";