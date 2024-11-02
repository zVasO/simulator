<?php

namespace App\Http\Controllers;

use App\Models\Investment;
use Inertia\Inertia;
use Inertia\Response;

class InvestmentController extends Controller
{
    public function simulator(): Response
    {
        return Inertia::render('Simulator/Investment', [
            'investment' => Investment::first()
        ]);
    }
}
