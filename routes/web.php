<?php

use App\Http\Controllers\InvestmentController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [InvestmentController::class, 'simulator']);
