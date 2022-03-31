<?php

namespace App\Http\Controllers;
use App\Anhlichhen;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class AnhLichHenController extends Controller
{
    public function getPhotos($id)
    {
        $customer = DB::table('anhlichhen')->where("idkhammoi",$id)->get();
        return $customer->toJson();
    }
    public function uploadPhotos(Request $request)
    {
        $image_64hd =  $request->preview;
        $idkhachhang = $request->idkhachhang;
		$iddieutri = $request->iddieutri;
        $idlich = $request->idlich;
        $idkhammoi = $request->idkhammoi;
        $extensionhd = explode('/', explode(':', substr($image_64hd, 0, strpos($image_64hd, ';')))[1])[1];   // .jpg .png .pdf

        $replacehd = substr($image_64hd, 0, strpos($image_64hd, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagehd = str_replace($replacehd, '', $image_64hd); 
      
       $imagehd = str_replace(' ', '+', $imagehd); 
      
       $imageNamehd ="lichhen-".str_random(10).'.'.$extensionhd;
        \File::put(public_path(). '/uploads/lichhen/' . $imageNamehd, base64_decode($imagehd));    
       
        if($image_64hd){
            $create = Anhlichhen::create([
                'idkhachhang' => $idkhachhang,
                'idlich' => '0',
                'iddieutri' => '0',
                'idkhammoi' => $idkhammoi,
                'url' => $imageNamehd
            ]);

            if($create){
                return response()->json([
                    'uploaded' => true
                ]);
            }
        }
    }
    public function destroy($id)
    {
      
      $photodieutri = Anhlichhen::find($id);
      $photodieutri->delete();

      return response()->json('Successfully Deleted');
    }
}
