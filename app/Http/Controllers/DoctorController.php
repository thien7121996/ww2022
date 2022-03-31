<?php

namespace App\Http\Controllers;
use App\Doctor;
use App\User;
use DB;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $doctors = Doctor::all();

        return $doctors->toJson();
    }
	public function chitietbacsi($id)
    {
        $doctors = Doctor::find($id);

        return $doctors->toJson();
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $path = 'uploads\doctor';
        $imageName="";
   
        if ($request->anhdaidien){
          $image_64 =  $request->anhdaidien;
          
          $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf
  
          $replace = substr($image_64, 0, strpos($image_64, ',')+1); 
        
        // find substring fro replace here eg: data:image/png;base64,
        
         $image = str_replace($replace, '', $image_64); 
        
         $image = str_replace(' ', '+', $image); 
        
         $imageName = "anhdaidien-".str_random(10).'.'.$extension;
          \File::put(public_path(). '/uploads/doctor/' .$imageName, base64_decode($image));        
        }
        else
        {
          $imageName="nonuser.jpg";
        }
        
        $ten = $request->ten;
        $ngaysinh = $request->ngaysinh;
        $gioitinh = $request->gioitinh;
        $email = $request->email;
        $dienthoai = $request->dienthoai;
        $mota = $request->mota;
     
        $doctors =  Doctor::create([
          'ten' => $ten,
          'ngaysinh' => $ngaysinh,
          'gioitinh' => $gioitinh,
          'email' => $email,
          'dienthoai' => $dienthoai,
          'anhdaidien' => $imageName,
          'mota' => $mota,
         
        ]);
        $doctorsuser =  User::create([
          'name' =>$request->ten,
         'email' => $request->email,
         'password' => \Hash::make($request->matkhau), 
         'role' => '3',
         'idkh' => $doctors->id,
         'remember_token' => str_random(10),
          
         ]);
      return response()->json('Tạo thành công');
    }
    public function login(Request $req)
    {
       
        $email=$req->email;
        $pass = $req->password;
        $result = DB::table('doctor')->where("email",$email)->get()->toArray();
        $checkauth=0;
        foreach($result as $value)
        {
            if($value->password == $pass)
            {
                $checkauth=1;
            }
            
        }
        if($checkauth==1)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $doctor = Doctor::where('id',$id);
        $doctor->delete();
      return response()->json('Xóa thành công');
    }
    public function bacsitheoid($id)
    {
      
        $doctor = Doctor::find($id);
      

      return $doctor->toJson();
    }
}
