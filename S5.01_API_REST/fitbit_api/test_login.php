<?php
require_once 'vendor/autoload.php';

use Illuminate\Foundation\Application;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Check if admin user exists
$admin = User::where('email', 'lux@admin.com')->first();

if ($admin) {
    echo "✅ Admin user found!\n";
    echo "Name: {$admin->name}\n";
    echo "Email: {$admin->email}\n";
    echo "Role: {$admin->role}\n";
    
    // Test password
    $passwordCheck = Hash::check('8000', $admin->password);
    echo "Password check with '8000': " . ($passwordCheck ? "✅ CORRECT" : "❌ INCORRECT") . "\n";
    
    if (!$passwordCheck) {
        echo "Current password hash: {$admin->password}\n";
        echo "Expected hash for '8000': " . Hash::make('8000') . "\n";
    }
} else {
    echo "❌ Admin user NOT found!\n";
    
    // List all users
    $users = User::all();
    echo "Available users:\n";
    foreach ($users as $user) {
        echo "- {$user->email} ({$user->role})\n";
    }
}