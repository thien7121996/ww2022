<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FrontEndUserController extends Controller
{
    public function signUp(Request $request)
{
    $user = User::create(['email' => $request->email, 'password' => bcrypt($request->password)]);
}
}
