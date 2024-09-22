<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CustomerController;


Route::post('/users', [UserController::class, 'create']);
Route::post('/sessions', [SessionController::class, 'login']);
Route::get('/customers', [CustomerController::class, 'index']);
