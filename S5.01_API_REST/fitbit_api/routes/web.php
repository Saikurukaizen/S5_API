<?php

use Illuminate\Support\Facades\Route;

/* Route::get('/', function () {
    return view('welcome');
}); */
Route::resource('disciplines', DisciplineController::class)->except(['create', 'edit']);

