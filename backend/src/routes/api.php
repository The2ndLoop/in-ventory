<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\UserController;


Route::post('/users', [UserController::class, 'createNewUser']);
Route::post('/sessions', [SessionController::class, 'login']);
