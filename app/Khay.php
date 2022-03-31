<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Khay extends Model
{
    protected $table = 'khay';
    protected $fillable = ['sokhay',
	'chinhanh',
	'ngayyeucau',
	'ngaynhan',
	'ngaygiao',
	'khachhang',
	'bacsi',
	'ghichu',
	'trangthai'
	];
	public function khachhangs()
	{
		return $this->belongsTo('App\Khachhang','khachhang','ID');
	}
	public function bacsis()
	{
		return $this->belongsTo('App\Doctor','bacsi','id');
	}
	public function chinhanhs()
	{
		return $this->belongsTo('App\Chinhanh','chinhanh','id');
	}
}
