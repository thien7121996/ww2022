<?php

namespace App\Http\Controllers;
use App\Donthuoc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DonThuocController extends Controller
{
    public function index()
    {
        $donthuoc = Donthuoc::all();
                            

        return $donthuoc->toJson();
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'idkhachhang' => 'required',
            'chandoan' => 'required',
            'chandoankhac' => 'required',
            'chidinh' => 'required',
            'ghichu' => 'required',
            'ngay' => 'required',
            'idbacsi' => 'required'
          ]);
  
          $donthuoc = Donthuoc::create([
            'idkhachhang' => $validatedData['idkhachhang'],
            'chandoan' => $validatedData['chandoan'],
            'chandoankhac' => $validatedData['chandoankhac'],
            'chidinh' => json_encode($validatedData['chidinh']),
            'ghichu' => $validatedData['ghichu'],
            'ngay' => $validatedData['ngay'],
            'idbacsi' => $validatedData['idbacsi']
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $donthuoc = Donthuoc::find($id);
        $donthuoc->idkhachhang = $request->get('idkhachhang');
        $donthuoc->chandoan = $request->get('chandoan');
        $donthuoc->chandoankhac = $request->get('chandoankhac');
        $donthuoc->chidinh = $request->get('chidinh');
        $donthuoc->ghichu = $request->get('ghichu');
        $donthuoc->ngay = $request->get('ngay');
        $donthuoc->idbacsi = $request->get('idbacsi');
        $donthuoc->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $donthuoc = Donthuoc::find($id);
      $donthuoc->delete();

      return response()->json('Successfully Deleted');
    }
    public function show($id)
    {
      $donthuoc = Donthuoc::find($id);
      return $donthuoc->toJson();
    }
    public function donthuoctheokhachhang($id)
    {
        $donthuoc = DB::table('donthuoc')->where("idkhachhang",'=',$id)->get();
        return $donthuoc->toJson();
    }
}
