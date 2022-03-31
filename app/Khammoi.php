<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Khammoi extends Model
{
    protected $table = 'khammoi';
    protected $fillable = ['ngay','nguon','benhly','dichvu','ghichu','bacsi','chiphi', 'chinhanh', 'thanhtoan','trangthaidieutri','idkhachhang','idsale','idsaleoff','sosao','note', 'ghichudieutri','phonegioithieu','trangthai7ngay','trangthai30ngay','trangthai90ngay','ngayhoanthanh'];
    public function khachhang()
	{
		return $this->belongsTo('App\Khachhang','idkhachhang','ID');
	}
    public function chinhanhs()
	{
		return $this->belongsTo('App\Chinhanh','chinhanh','id');
	}
	public function nguons()
	{
		return $this->belongsTo('App\Nguongioithieu','nguon','id');
	}
    public function bacsis()
	{
		return $this->belongsTo('App\Doctor','bacsi','id');
	}
    public function dichvus()
	{
		return $this->belongsTo('App\Dichvu','dichvu','id');
	}
	public function sales()
	{
		return $this->belongsTo('App\User','idsale','id');
	}
	public function salesoffline()
	{
		return $this->belongsTo('App\User','idsaleoff','id');
	}
}
