<?php

namespace App\Http\Controllers;
use App\Thanhtoandaxoa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ThanhToanDaXoaController extends Controller
{
    public function index($id)
    {
        $thanhtoan = Thanhtoandaxoa::where("idkhammoi",'=',$id)->get();
        for($i=0;$i<count($thanhtoan);$i++)
        {
          $tongdoanvan=[];
          $paragraphs = explode("\n", $thanhtoan[$i]->ghichu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $thanhtoan[$i]["ghichutext"]=$tongdoanvan;
        }  
        return $thanhtoan->toJson();
    }
}
