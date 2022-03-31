<?php

namespace App\Http\Controllers;
use App\Tiensubenh;
use Illuminate\Http\Request;

class TienSuBenhController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tiensubenh = Tiensubenh::all();

        return $tiensubenh->toJson();
    }

    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'ten' => 'required',
			'ghichu' => 'required',
          ]);
  
          $tiensubenh = Tiensubenh::create([
            'ten' => $validatedData['ten'],
			'ghichu' => $validatedData['ghichu'],
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $tiensubenh = Tiensubenh::find($id);
        $tiensubenh->ten = $request->get('ten');
		$tiensubenh->ghichu = $request->get('ghichu');
        $tiensubenh->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $tiensubenh = Tiensubenh::find($id);
      $tiensubenh->delete();

      return response()->json('Successfully Deleted');
    }
    public function tiensubenhtheonguoidung(Request $request)
    {   
        
        $array = explode(',', $request->get('nhomtiensubenh'));
        $tiensubenh = Tiensubenh::select('id','ten')
             ->whereIn('id',$array)
             ->get();
        return $tiensubenh->toJson();
    }
}
