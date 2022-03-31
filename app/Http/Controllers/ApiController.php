<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use JWTAuth;
use JWTAuthException;
use App\User;
use Session;
class ApiController extends Controller
{

    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        $token = null;
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'invalid_email_or_password',
                ]);
            }
        } catch (JWTAuthException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'failed_to_create_token',
            ]);
        }
        $user = User::where('email',$request->get('email'))->select("id")->first();
        $userrole = User::where('email',$request->get('email'))->select("role")->first();
        $userkhid = User::where('email',$request->get('email'))->select("idkh")->first();
        $userkhname = User::where('email',$request->get('email'))->select("name")->first();
        $userchinhanh = User::where('email',$request->get('email'))->select("chinhanh")->first();
        Session::put('userquantri', $userkhname);
        return response()->json([
            'response' => 'success',
            'result' => [
                'token' => $token,
                'iduser' => $user,
                'roleuser' => $userrole,
                'userkhid' => $userkhid,
                'userkhname' => $userkhname,
                'userchinhanh' => $userchinhanh
            ],
        ]);
    }
    public function infouser($id)
    {
        $user = User::find($id);
        return $user->toJson();
    }
    public function danhSachTaiKhoan(Request $request)
    {
        $user = User::with('roles')->with('chinhanhs')->get();
        return $user->toJson();
    }
    public function danhSachTaiKhoanSale(Request $request)
    {
        $user = User::with('roles')->with('chinhanhs')->where('role',4)->get();
        return $user->toJson();
    }
    public function danhSachTaiKhoanSaleOffline(Request $request)
    {
        $user = User::with('roles')->with('chinhanhs')->where('role',5)->get();
        return $user->toJson();
    }
	public function danhSachTaiKhoanRoleSale(Request $request)
    {
        $user = User::with('roles')->with('chinhanhs')->where('role',4)->orWhere('role',5)->get();
        return $user->toJson();
    }
	public function danhsachtaikhoanrolesalebyleader(Request $request,$id)
    {
		$usertim = User::find($id);
		if($usertim->leadersale==1)
		{
			if($usertim->danhsachsale=="null")
			{
				$user = User::with('roles')->with('chinhanhs')->where('role',4)->orWhere('role',5)->get();
			}
			else
			{
				$mangidsale=[];
				$manguser=json_decode($usertim->danhsachsale);
				for($p=0;$p<count($manguser);$p++)
				{
					$mangidsale[]=$manguser[$p]->value;
				}
				$user = User::with('roles')->with('chinhanhs')->whereIn('id',$mangidsale)->get();
			}
		
		}
		else
		{
			 $user = [];
		}
        return $user->toJson();
    }
    public function taoTaiKhoan(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
            'role' => 'required',
            'nguon' => 'required',
          ]);
          if($request->role == "4" || $request->role =="5")
		  {
			$user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => \Hash::make($validatedData['password']),
            'role' => $validatedData['role'],
            'idkh' => '0',
            'nguon' => json_encode($validatedData['nguon']),
            'chinhanh' => json_encode($request->chinhanh),
			'leadersale' => $request->leadersale,
			'danhsachsale' => json_encode($request->danhsachsale),
            'remember_token' => str_random(10),
			]); 
		  }
		  else
		  {
			   $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => \Hash::make($validatedData['password']),
            'role' => $validatedData['role'],
            'idkh' => '0',
            'nguon' => json_encode($validatedData['nguon']),
            'chinhanh' => json_encode($request->chinhanh),
            'remember_token' => str_random(10),
			]); 
			  
		  }
          
     
      return response()->json('Project created!');
    }
    public function updateTaiKhoan(Request $request,$id)
    {
        $user = User::find($id);
        $user->name = $request->get('name');
        $user->email = $request->get('email');
        $user->chinhanh = json_encode($request->get('chinhanh'));
        $user->nguon = json_encode($request->get('nguon'));
		if($request->role == "4" || $request->role =="5")
		{
			$user->leadersale = $request->get('leadersale');
			$user->danhsachsale = json_encode($request->get('danhsachsale'));
		}
        if($request->get('password')!="")
        {
            $user->password = \Hash::make($request->get('password'));
        }
       
        $user->role = $request->get('role');
        $user->save();
     
      return response()->json('Đã cập nhật tài khoản');
    }
    
}