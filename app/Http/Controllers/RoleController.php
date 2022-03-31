<?php

namespace App\Http\Controllers;
use App\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        $role = Role::all();
                            

        return $role->toJson();
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'role' => 'required',
            'phantram' => 'required',
          
         

          ]);
  
          $role = Role::create([
            'role' => $validatedData['role'],
            'phantram' => $validatedData['phantram']
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $role = Role::find($id);
        $role->role = $request->get('role');
        $role->phantram = $request->get('phantram');
        
        $role->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $role = Role::find($id);
      $role->delete();

      return response()->json('Successfully Deleted');
    }
    public function chitietrole($id)
    {
      
      $role = Role::find($id);
      

      return $role->toJson();
    }
    
}