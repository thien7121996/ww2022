<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dieutritheolich extends Model
{
    protected $table = 'dieutritheolich';
    protected $fillable = ['ngay', 'idlich', 'dieutri', 'bacsi', 'trangthai', 'luuy', 'idkhammoi', 'idkhachhang', 'chinhanh', 'moicu'];
    public function chinhanhs()
	{
		return $this->belongsTo('App\Chinhanh','chinhanh');
	}
	 public function bacsis()
	{
		return $this->belongsTo('App\Doctor','bacsi','id');
	}
	public function dichvus()
	{
		return $this->belongsTo('App\Sanphamdichvu','dieutri','id');
	}
	public function khachhangs()
	{
		return $this->belongsTo('App\Khachhang','idkhachhang','ID');
	}
	public function lichhens()
	{
		return $this->belongsTo('App\Thoigianbieu','idlich','id');
	}
}
