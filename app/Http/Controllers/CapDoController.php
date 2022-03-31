<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Capdo;
use Illuminate\Support\Facades\DB;

class CapDoController extends Controller
{
    public function getcapdo()
    {
        $capdo = Capdo::all();
        return $capdo->toJson();
    }
    public function themcapdo(Request $request)
    {
         $validatedData = $request->validate([
            'tencapdo' => 'required',
            'phantram' => 'required',
            'sotiencapdo' => 'required',
          ]);
  
          $capdo = Capdo::create([
            'tencapdo' => $request->tencapdo,
            'phantram' => $request->phantram,
            'sotiencapdo' => $request->sotiencapdo
            
          ]);
          $customer = DB::table('khachhang')->get();
          foreach($customer as $ct)
          {
            $xoatichluy = Tientichluy::where('idkhachhang',$ct->ID)->delete();
            $tichluy = Lichsutichluy::where('khachhanggioithieu',$ct->ID)->sum('tienthanhtoan');
            $doanhthu = Thanhtoankhachhang::where('idkhachhang',$ct->ID)->sum('tongtien');
            $sotientichluy=$doanhthu*($this->timcapdo($doanhthu)/100);
            $sotienhoahong=$tichluy*($this->timcapdo($doanhthu)/100);
            $thanhtoan = Tientichluy::create([
              'tientichluy' => $sotientichluy+$sotienhoahong,
              'idkhachhang' => $ct->ID
            ]);
          }  
      return response()->json('Project created!');
    }
    public function capnhatcapdo(Request $request, $id)
    {
     
        $capdo = Capdo::find($id);
        if($request->get('tencapdo') !== NULL)
        {
          $capdo->tencapdo = $request->get('tencapdo');
        }
        if($request->get('phantram') !== NULL)
        {
          $capdo->phantram = $request->get('phantram');
        }
        if($request->get('sotiencapdo') !== NULL)
        {
          $capdo->sotiencapdo = $request->get('sotiencapdo');
        }
       
      
    
        $capdo->save();
        
        return response()->json('Successfully Updated');
    }
    public function xoacapdo($id)
    {
      
        $capdo = Capdo::find($id);
        $capdo->delete();

      return response()->json('Successfully Deleted');
    }
    public function getcapdotheoid($id){
        $capdo = DB::table('capdo')->where("id",'=',$id)->get();
        return $capdo->toJson();
    }

    
}
