<?php

namespace App\Http\Controllers;
use App\Phieuchi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class PhieuChiController extends Controller
{
    public function index()
    {
        $phieuchi = Phieuchi::all();
                            

        return $phieuchi->toJson();
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'khoanchi' => 'required',
        'ngaychi' => 'required',
        'sotien' => 'required'
          ]);
  
          $phieuchi = Phieuchi::create([
            'khoanchi' => $validatedData['khoanchi'],
            'ngaychi' => $validatedData['ngaychi'],
            'sotien' => $validatedData['sotien'],
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $phieuchi = Phieuchi::find($id);
        $phieuchi->ngaychi = $request->get('ngaychi');
        $phieuchi->sotien = $request->get('sotien');
        $phieuchi->khoanchi = $request->get('khoanchi');
        $phieuchi->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $phieuchi = Phieuchi::find($id);
      $phieuchi->delete();

      return response()->json('Successfully Deleted');
    }
    public function loctheongay(Request $request)
    {
    $datestart=$request->get('datestart');
    $dateend=$request->get('dateend');
      $phieuchi = DB::table('chitieuhangngay')->where('ngaychi', '>=', $datestart)
                     ->where('ngaychi', '<=',$dateend)
                     ->get();
    return $phieuchi->toJson();
    }
    public function tinhtong()
    {

      $phieuchi = DB::table('chitieuhangngay')->avg('sotien');
    return $phieuchi;
    }
}
